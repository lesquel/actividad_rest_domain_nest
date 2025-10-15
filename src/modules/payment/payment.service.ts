import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { parseDate } from '../../common/utils/date.utils.js';
import type { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import type { Payment } from '../../domain/entities/payment.entity.js';
import type { Reservation } from '../../domain/entities/reservation.entity.js';
import type { User } from '../../domain/entities/user.entity.js';
import type { PaymentRepository } from '../../domain/repositories/payment.repository.js';
import type { ReservationRepository } from '../../domain/repositories/reservation.repository.js';
import type { UserRepository } from '../../domain/repositories/user.repository.js';
import {
  PAYMENT_REPOSITORY,
  RESERVATION_REPOSITORY,
  USER_REPOSITORY,
} from '../../application/tokens.js';
import type { CreatePaymentDto } from './dto/create-payment.dto.js';
import type { UpdatePaymentDto } from './dto/update-payment.dto.js';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: PaymentRepository,
    @Inject(RESERVATION_REPOSITORY)
    private readonly reservationRepository: ReservationRepository,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async findAll({ offset, limit }: PaginationQueryDto = {}): Promise<
    Payment[]
  > {
    return this.paymentRepository.findAll({ offset, limit });
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found.`);
    }
    return payment;
  }

  async create(dto: CreatePaymentDto): Promise<Payment> {
    const reservation = await this.resolveReservation(dto.reservationId);
    const user = await this.resolveUser(dto.userId);
    this.ensureUserMatchesReservation(user, reservation);

    const payment: Payment = {
      id: randomUUID(),
      reservation,
      user,
      amount: dto.amount,
      currency: dto.currency,
      method: dto.method,
      status: dto.status,
      paidAt: parseDate(dto.paidAt, 'paidAt'),
      reference: dto.reference,
      notes: dto.notes,
    };

    return this.paymentRepository.create(payment);
  }

  async update(id: string, dto: UpdatePaymentDto): Promise<Payment> {
    const existing = await this.findOne(id);

    const reservation =
      dto.reservationId === undefined
        ? existing.reservation
        : await this.resolveReservation(dto.reservationId);

    const user =
      dto.userId === undefined
        ? existing.user
        : await this.resolveUser(dto.userId);

    this.ensureUserMatchesReservation(user, reservation);

    const updated: Payment = {
      ...existing,
      reservation,
      user,
      amount: dto.amount ?? existing.amount,
      currency: dto.currency ?? existing.currency,
      method: dto.method ?? existing.method,
      status: dto.status ?? existing.status,
      paidAt: dto.paidAt ? parseDate(dto.paidAt, 'paidAt') : existing.paidAt,
      reference: dto.reference ?? existing.reference,
      notes: dto.notes ?? existing.notes,
    };

    return this.paymentRepository.update(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.paymentRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Payment with id ${id} not found.`);
    }

    await this.paymentRepository.delete(id);
  }

  private async resolveReservation(id: string): Promise<Reservation> {
    const reservation = await this.reservationRepository.findById(id);
    if (!reservation) {
      throw new NotFoundException(`Reservation with id ${id} not found.`);
    }
    return reservation;
  }

  private async resolveUser(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    return user;
  }

  private ensureUserMatchesReservation(
    user: User,
    reservation: Reservation,
  ): void {
    if (reservation.user.id !== user.id) {
      throw new BadRequestException(
        'Payment user must match the reservation user.',
      );
    }
  }
}
