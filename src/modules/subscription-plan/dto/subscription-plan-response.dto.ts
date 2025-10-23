import { ApiProperty } from '@nestjs/swagger';
import type { SubscriptionPlan } from '../../../domain/entities/subscription-plan.entity.js';
import {
  SUBSCRIPTION_BILLING_CYCLES,
  SUBSCRIPTION_PLAN_STATUS,
  SUBSCRIPTION_TIERS,
} from './subscription-plan.constants.js';

export class SubscriptionPlanResponseDto {
  @ApiProperty({
    description: 'Identificador único del plan',
    format: 'uuid',
    example: 'e9b5587a-5a4a-4cb9-b9f8-87df5fbd1f08',
  })
  id!: string;

  @ApiProperty({
    description: 'Nombre comercial del plan',
    example: 'Plan Profesional',
  })
  name!: string;

  @ApiProperty({
    description: 'Nivel o tier del plan',
    enum: SUBSCRIPTION_TIERS,
    example: 'PREMIUM',
  })
  tier!: SubscriptionPlan['tier'];

  @ApiProperty({
    description: 'Precio del plan',
    type: Number,
    example: 1499,
  })
  price!: number;

  @ApiProperty({
    description: 'Frecuencia de cobro del plan',
    enum: SUBSCRIPTION_BILLING_CYCLES,
    example: 'MONTHLY',
  })
  billingCycle!: SubscriptionPlan['billingCycle'];

  @ApiProperty({
    description: 'Estado actual del plan',
    enum: SUBSCRIPTION_PLAN_STATUS,
    example: 'ACTIVE',
  })
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
