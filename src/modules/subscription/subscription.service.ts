import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { parseDate } from '../../common/utils/date.utils.js';
import type { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import type { SubscriptionPlan } from '../../domain/entities/subscription-plan.entity.js';
import type { Subscription } from '../../domain/entities/subscription.entity.js';
import type { Restaurant } from '../../domain/entities/restaurant.entity.js';
import type { User } from '../../domain/entities/user.entity.js';
import type { SubscriptionPlanRepository } from '../../domain/repositories/subscription-plan.repository.js';
import type { SubscriptionRepository } from '../../domain/repositories/subscription.repository.js';
import type { RestaurantRepository } from '../../domain/repositories/restaurant.repository.js';
import type { UserRepository } from '../../domain/repositories/user.repository.js';
import {
  RESTAURANT_REPOSITORY,
  SUBSCRIPTION_PLAN_REPOSITORY,
  SUBSCRIPTION_REPOSITORY,
  USER_REPOSITORY,
} from '../../application/tokens.js';
import type { CreateSubscriptionDto } from './dto/create-subscription.dto.js';
import type { UpdateSubscriptionDto } from './dto/update-subscription.dto.js';

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY)
    private readonly subscriptionRepository: SubscriptionRepository,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(RESTAURANT_REPOSITORY)
    private readonly restaurantRepository: RestaurantRepository,
    @Inject(SUBSCRIPTION_PLAN_REPOSITORY)
    private readonly subscriptionPlanRepository: SubscriptionPlanRepository,
  ) {}

  async findAll({ offset, limit }: PaginationQueryDto = {}): Promise<
    Subscription[]
  > {
    return this.subscriptionRepository.findAll({ offset, limit });
  }

  async findOne(id: string): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findById(id);
    if (!subscription) {
      throw new NotFoundException(`Subscription with id ${id} not found.`);
    }
    return subscription;
  }

  async create(dto: CreateSubscriptionDto): Promise<Subscription> {
    const user = await this.resolveUser(dto.userId);
    const restaurant = await this.resolveRestaurant(dto.restaurantId);
    const plan = await this.resolvePlan(dto.planId);

    const subscription: Subscription = {
      id: randomUUID(),
      user,
      restaurant,
      plan,
      startsOn: parseDate(dto.startsOn, 'startsOn'),
      endsOn:
        dto.endsOn === undefined
          ? undefined
          : dto.endsOn === null
            ? null
            : parseDate(dto.endsOn, 'endsOn'),
      status: dto.status ?? 'ACTIVE',
    };

    return this.subscriptionRepository.create(subscription);
  }

  async update(id: string, dto: UpdateSubscriptionDto): Promise<Subscription> {
    const existing = await this.findOne(id);

    const user =
      dto.userId === undefined
        ? existing.user
        : await this.resolveUser(dto.userId);

    const restaurant =
      dto.restaurantId === undefined
        ? existing.restaurant
        : await this.resolveRestaurant(dto.restaurantId);

    const plan =
      dto.planId === undefined
        ? existing.plan
        : await this.resolvePlan(dto.planId);

    const updated: Subscription = {
      ...existing,
      user,
      restaurant,
      plan,
      startsOn: dto.startsOn
        ? parseDate(dto.startsOn, 'startsOn')
        : existing.startsOn,
      endsOn:
        dto.endsOn === undefined
          ? existing.endsOn
          : dto.endsOn === null
            ? null
            : parseDate(dto.endsOn, 'endsOn'),
      status: dto.status ?? existing.status,
    };

    return this.subscriptionRepository.update(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.subscriptionRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Subscription with id ${id} not found.`);
    }

    await this.subscriptionRepository.delete(id);
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

  private async resolvePlan(id: string): Promise<SubscriptionPlan> {
    const plan = await this.subscriptionPlanRepository.findById(id);
    if (!plan) {
      throw new NotFoundException(`Subscription plan with id ${id} not found.`);
    }
    return plan;
  }
}
