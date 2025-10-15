import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import type { Restaurant } from '../../domain/entities/restaurant.entity.js';
import type { Menu } from '../../domain/entities/menu.entity.js';
import type { MenuRepository } from '../../domain/repositories/menu.repository.js';
import type { RestaurantRepository } from '../../domain/repositories/restaurant.repository.js';
import {
  MENU_REPOSITORY,
  RESTAURANT_REPOSITORY,
} from '../../application/tokens.js';
import type { CreateMenuDto } from './dto/create-menu.dto.js';
import type { UpdateMenuDto } from './dto/update-menu.dto.js';

@Injectable()
export class MenuService {
  constructor(
    @Inject(MENU_REPOSITORY) private readonly menuRepository: MenuRepository,
    @Inject(RESTAURANT_REPOSITORY)
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  async findAll({ offset, limit }: PaginationQueryDto = {}): Promise<Menu[]> {
    return this.menuRepository.findAll({ offset, limit });
  }

  async findOne(id: string): Promise<Menu> {
    const menu = await this.menuRepository.findById(id);
    if (!menu) {
      throw new NotFoundException(`Menu with id ${id} not found.`);
    }
    return menu;
  }

  async create(dto: CreateMenuDto): Promise<Menu> {
    const restaurant = await this.resolveRestaurant(dto.restaurantId);
    const menu: Menu = {
      id: randomUUID(),
      restaurant,
      name: dto.name,
      description: dto.description,
      price: dto.price,
      coverImageUrl: dto.coverImageUrl,
    };

    return this.menuRepository.create(menu);
  }

  async update(id: string, dto: UpdateMenuDto): Promise<Menu> {
    const existing = await this.findOne(id);
    const restaurant =
      dto.restaurantId === undefined
        ? existing.restaurant
        : await this.resolveRestaurant(dto.restaurantId);

    const updated: Menu = {
      ...existing,
      restaurant,
      name: dto.name ?? existing.name,
      description: dto.description ?? existing.description,
      price: dto.price ?? existing.price,
      coverImageUrl: dto.coverImageUrl ?? existing.coverImageUrl,
    };

    return this.menuRepository.update(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.menuRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Menu with id ${id} not found.`);
    }

    await this.menuRepository.delete(id);
  }

  private async resolveRestaurant(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findById(id);
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id ${id} not found.`);
    }
    return restaurant;
  }
}
