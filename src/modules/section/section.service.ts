import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import type { Restaurant } from '../../domain/entities/restaurant.entity.js';
import type { Section } from '../../domain/entities/section.entity.js';
import type { RestaurantRepository } from '../../domain/repositories/restaurant.repository.js';
import type { SectionRepository } from '../../domain/repositories/section.repository.js';
import {
  RESTAURANT_REPOSITORY,
  SECTION_REPOSITORY,
} from '../../application/tokens.js';
import type { CreateSectionDto } from './dto/create-section.dto.js';
import type { UpdateSectionDto } from './dto/update-section.dto.js';

@Injectable()
export class SectionService {
  constructor(
    @Inject(SECTION_REPOSITORY)
    private readonly sectionRepository: SectionRepository,
    @Inject(RESTAURANT_REPOSITORY)
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  async findAll({ offset, limit }: PaginationQueryDto = {}): Promise<
    Section[]
  > {
    return this.sectionRepository.findAll({ offset, limit });
  }

  async findOne(id: string): Promise<Section> {
    const section = await this.sectionRepository.findById(id);
    if (!section) {
      throw new NotFoundException(`Section with id ${id} not found.`);
    }
    return section;
  }

  async create(dto: CreateSectionDto): Promise<Section> {
    const restaurant = await this.resolveRestaurant(dto.restaurantId);
    const section: Section = {
      id: randomUUID(),
      restaurant,
      name: dto.name,
      description: dto.description,
    };

    return this.sectionRepository.create(section);
  }

  async update(id: string, dto: UpdateSectionDto): Promise<Section> {
    const existing = await this.findOne(id);
    const restaurant =
      dto.restaurantId === undefined
        ? existing.restaurant
        : await this.resolveRestaurant(dto.restaurantId);

    const updated: Section = {
      ...existing,
      restaurant,
      name: dto.name ?? existing.name,
      description: dto.description ?? existing.description,
    };

    return this.sectionRepository.update(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.sectionRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Section with id ${id} not found.`);
    }

    await this.sectionRepository.delete(id);
  }

  private async resolveRestaurant(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findById(id);
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id ${id} not found.`);
    }
    return restaurant;
  }
}
