import type { SubscriptionPlan } from '../../../domain/entities/subscription-plan.entity.js';

export class SubscriptionPlanResponseDto {
  id!: string;
  name!: string;
  tier!: SubscriptionPlan['tier'];
  price!: number;
  billingCycle!: SubscriptionPlan['billingCycle'];
  status!: SubscriptionPlan['status'];

  static fromDomain(plan: SubscriptionPlan): SubscriptionPlanResponseDto {
    const dto = new SubscriptionPlanResponseDto();
    dto.id = plan.id;
    dto.name = plan.name;
    dto.tier = plan.tier;
    dto.price = plan.price;
    dto.billingCycle = plan.billingCycle;
    dto.status = plan.status;
    return dto;
  }
}
