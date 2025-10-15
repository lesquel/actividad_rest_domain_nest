import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { parseDate } from '../../common/utils/date.utils.js';
import type { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import type { Review } from '../../domain/entities/review.entity.js';
import type { Restaurant } from '../../domain/entities/restaurant.entity.js';
import type { User } from '../../domain/entities/user.entity.js';
import type { RestaurantRepository } from '../../domain/repositories/restaurant.repository.js';
import type { ReviewRepository } from '../../domain/repositories/review.repository.js';
import type { UserRepository } from '../../domain/repositories/user.repository.js';
import {
  RESTAURANT_REPOSITORY,
  REVIEW_REPOSITORY,
  USER_REPOSITORY,
} from '../../application/tokens.js';
import type { CreateReviewDto } from './dto/create-review.dto.js';
import type { UpdateReviewDto } from './dto/update-review.dto.js';

@Injectable()
export class ReviewService {
  constructor(
    @Inject(REVIEW_REPOSITORY)
    private readonly reviewRepository: ReviewRepository,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(RESTAURANT_REPOSITORY)
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  async findAll({ offset, limit }: PaginationQueryDto = {}): Promise<Review[]> {
    return this.reviewRepository.findAll({ offset, limit });
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewRepository.findById(id);
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found.`);
    }
    return review;
  }

  async create(dto: CreateReviewDto): Promise<Review> {
    const user = await this.resolveUser(dto.userId);
    const restaurant = await this.resolveRestaurant(dto.restaurantId);

    const review: Review = {
      id: randomUUID(),
      user,
      restaurant,
      rating: dto.rating,
      comment: dto.comment,
      createdAt: dto.createdAt
        ? parseDate(dto.createdAt, 'createdAt')
        : new Date(),
    };

    return this.reviewRepository.create(review);
  }

  async update(id: string, dto: UpdateReviewDto): Promise<Review> {
    const existing = await this.findOne(id);

    const user =
      dto.userId === undefined
        ? existing.user
        : await this.resolveUser(dto.userId);
    const restaurant =
      dto.restaurantId === undefined
        ? existing.restaurant
        : await this.resolveRestaurant(dto.restaurantId);

    const updated: Review = {
      ...existing,
      user,
      restaurant,
      rating: dto.rating ?? existing.rating,
      comment: dto.comment ?? existing.comment,
      createdAt: dto.createdAt
        ? parseDate(dto.createdAt, 'createdAt')
        : existing.createdAt,
    };

    return this.reviewRepository.update(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.reviewRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Review with id ${id} not found.`);
    }

    await this.reviewRepository.delete(id);
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
}
