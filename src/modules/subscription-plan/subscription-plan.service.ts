import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import type { SubscriptionPlan } from '../../domain/entities/subscription-plan.entity.js';
import type { SubscriptionPlanRepository } from '../../domain/repositories/subscription-plan.repository.js';
import { SUBSCRIPTION_PLAN_REPOSITORY } from '../../application/tokens.js';
import type { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto.js';
import type { UpdateSubscriptionPlanDto } from './dto/update-subscription-plan.dto.js';

@Injectable()
export class SubscriptionPlanService {
  constructor(
    @Inject(SUBSCRIPTION_PLAN_REPOSITORY)
    private readonly subscriptionPlanRepository: SubscriptionPlanRepository,
  ) {}

  async findAll({ offset, limit }: PaginationQueryDto = {}): Promise<
    SubscriptionPlan[]
  > {
    return this.subscriptionPlanRepository.findAll({ offset, limit });
  }

  async findOne(id: string): Promise<SubscriptionPlan> {
    const plan = await this.subscriptionPlanRepository.findById(id);
    if (!plan) {
      throw new NotFoundException(`Subscription plan with id ${id} not found.`);
    }
    return plan;
  }

  async create(dto: CreateSubscriptionPlanDto): Promise<SubscriptionPlan> {
    const plan: SubscriptionPlan = {
      id: randomUUID(),
      name: dto.name,
      tier: dto.tier,
      price: dto.price,
      billingCycle: dto.billingCycle,
      status: dto.status,
    };

    return this.subscriptionPlanRepository.create(plan);
  }

  async update(
    id: string,
    dto: UpdateSubscriptionPlanDto,
  ): Promise<SubscriptionPlan> {
    const existing = await this.findOne(id);
    const updated: SubscriptionPlan = {
      ...existing,
      name: dto.name ?? existing.name,
      tier: dto.tier ?? existing.tier,
      price: dto.price ?? existing.price,
      billingCycle: dto.billingCycle ?? existing.billingCycle,
      status: dto.status ?? existing.status,
    };

    return this.subscriptionPlanRepository.update(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.subscriptionPlanRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Subscription plan with id ${id} not found.`);
    }

    await this.subscriptionPlanRepository.delete(id);
  }
}
