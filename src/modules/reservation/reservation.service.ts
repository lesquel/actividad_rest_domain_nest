import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { parseDate } from '../../common/utils/date.utils.js';
import type { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import type { DiningTable } from '../../domain/entities/table.entity.js';
import type { Reservation } from '../../domain/entities/reservation.entity.js';
import type { Restaurant } from '../../domain/entities/restaurant.entity.js';
import type { User } from '../../domain/entities/user.entity.js';
import type { ReservationRepository } from '../../domain/repositories/reservation.repository.js';
import type { RestaurantRepository } from '../../domain/repositories/restaurant.repository.js';
import type { TableRepository } from '../../domain/repositories/table.repository.js';
import type { UserRepository } from '../../domain/repositories/user.repository.js';
import {
  RESERVATION_REPOSITORY,
  RESTAURANT_REPOSITORY,
  TABLE_REPOSITORY,
  USER_REPOSITORY,
} from '../../application/tokens.js';
import type { CreateReservationDto } from './dto/create-reservation.dto.js';
import type { UpdateReservationDto } from './dto/update-reservation.dto.js';

@Injectable()
export class ReservationService {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private readonly reservationRepository: ReservationRepository,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(RESTAURANT_REPOSITORY)
    private readonly restaurantRepository: RestaurantRepository,
    @Inject(TABLE_REPOSITORY) private readonly tableRepository: TableRepository,
  ) {}

  async findAll({ offset, limit }: PaginationQueryDto = {}): Promise<
    Reservation[]
  > {
    return this.reservationRepository.findAll({ offset, limit });
  }

  async findOne(id: string): Promise<Reservation> {
    const reservation = await this.reservationRepository.findById(id);
    if (!reservation) {
      throw new NotFoundException(`Reservation with id ${id} not found.`);
    }
    return reservation;
  }

  async create(dto: CreateReservationDto): Promise<Reservation> {
    const user = await this.resolveUser(dto.userId);
    const restaurant = await this.resolveRestaurant(dto.restaurantId);
    const table = await this.resolveTable(dto.tableId, restaurant);

    const reservation: Reservation = {
      id: randomUUID(),
      user,
      restaurant,
      table,
      reservationDate: parseDate(dto.reservationDate, 'reservationDate'),
      reservationTime: dto.reservationTime,
      guestCount: dto.guestCount,
      status: dto.status ?? 'PENDING',
      notes: dto.notes,
    };

    return this.reservationRepository.create(reservation);
  }

  async update(id: string, dto: UpdateReservationDto): Promise<Reservation> {
    const existing = await this.findOne(id);

    const user =
      dto.userId === undefined
        ? existing.user
        : await this.resolveUser(dto.userId);

    const restaurant =
      dto.restaurantId === undefined
        ? existing.restaurant
        : await this.resolveRestaurant(dto.restaurantId);

    const table = await this.resolveTableForUpdate(
      existing.table,
      dto.tableId,
      restaurant,
      dto.restaurantId !== undefined,
    );

    const updated: Reservation = {
      ...existing,
      user,
      restaurant,
      table,
      reservationDate: dto.reservationDate
        ? parseDate(dto.reservationDate, 'reservationDate')
        : existing.reservationDate,
      reservationTime: dto.reservationTime ?? existing.reservationTime,
      guestCount: dto.guestCount ?? existing.guestCount,
      status: dto.status ?? existing.status,
      notes: dto.notes ?? existing.notes,
    };

    return this.reservationRepository.update(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.reservationRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Reservation with id ${id} not found.`);
    }

    await this.reservationRepository.delete(id);
  }

  private async resolveUser(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    return user;
  }

  private async resolveRestaurant(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findById(id);
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id ${id} not found.`);
    }
    return restaurant;
  }

  private async resolveTable(
    id: string,
    restaurant: Restaurant,
  ): Promise<DiningTable> {
    const table = await this.tableRepository.findById(id);
    if (!table) {
      throw new NotFoundException(`Table with id ${id} not found.`);
    }
    if (table.section.restaurant.id !== restaurant.id) {
      throw new BadRequestException(
        'Table does not belong to the specified restaurant.',
      );
    }
    return table;
  }

  private async resolveTableForUpdate(
    current: DiningTable,
    newTableId: string | undefined,
    restaurant: Restaurant,
    restaurantChanged: boolean,
  ): Promise<DiningTable> {
    if (newTableId) {
      return this.resolveTable(newTableId, restaurant);
    }

    if (restaurantChanged && current.section.restaurant.id !== restaurant.id) {
      throw new BadRequestException(
        'The current table does not belong to the updated restaurant.',
      );
    }

    return current;
  }
}
