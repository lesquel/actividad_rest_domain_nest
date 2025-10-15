import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import type { Image } from '../../domain/entities/image.entity.js';
import type { Restaurant } from '../../domain/entities/restaurant.entity.js';
import type { ImageRepository } from '../../domain/repositories/image.repository.js';
import type { RestaurantRepository } from '../../domain/repositories/restaurant.repository.js';
import {
  IMAGE_REPOSITORY,
  RESTAURANT_REPOSITORY,
} from '../../application/tokens.js';
import type { CreateRestaurantDto } from './dto/create-restaurant.dto.js';
import type { UpdateRestaurantDto } from './dto/update-restaurant.dto.js';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject(RESTAURANT_REPOSITORY)
    private readonly restaurantRepository: RestaurantRepository,
    @Inject(IMAGE_REPOSITORY)
    private readonly imageRepository: ImageRepository,
  ) {}

  async findAll({ offset, limit }: PaginationQueryDto = {}): Promise<
    Restaurant[]
  > {
    return this.restaurantRepository.findAll({ offset, limit });
  }

  async findOne(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findById(id);
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id ${id} not found.`);
    }
    return restaurant;
  }

  async create(dto: CreateRestaurantDto): Promise<Restaurant> {
    const image = await this.resolveImage(dto.imageId);
    const restaurant: Restaurant = {
      id: randomUUID(),
      name: dto.name,
      description: dto.description,
      address: dto.address,
      openingHours: dto.openingHours,
      capacity: dto.capacity,
      image,
    };

    return this.restaurantRepository.create(restaurant);
  }

  async update(id: string, dto: UpdateRestaurantDto): Promise<Restaurant> {
    const existing = await this.findOne(id);
    const image =
      dto.imageId === undefined
        ? existing.image
        : await this.resolveImage(dto.imageId);

    const updated: Restaurant = {
      ...existing,
      name: dto.name ?? existing.name,
      description: dto.description ?? existing.description,
      address: dto.address ?? existing.address,
      openingHours: dto.openingHours ?? existing.openingHours,
      capacity: dto.capacity ?? existing.capacity,
      image,
    };

    return this.restaurantRepository.update(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.restaurantRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Restaurant with id ${id} not found.`);
    }

    await this.restaurantRepository.delete(id);
  }

  private async resolveImage(imageId?: string): Promise<Image | null> {
    if (!imageId) {
      return null;
    }

    const image = await this.imageRepository.findById(imageId);
    if (!image) {
      throw new NotFoundException(`Image with id ${imageId} not found.`);
    }
    return image;
  }
}
