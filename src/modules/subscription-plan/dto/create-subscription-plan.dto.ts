import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

import type { SubscriptionPlan } from '../../../domain/entities/subscription-plan.entity.js';
import {
  SUBSCRIPTION_BILLING_CYCLES,
  SUBSCRIPTION_PLAN_STATUS,
  SUBSCRIPTION_TIERS,
} from './subscription-plan.constants.js';

export class CreateSubscriptionPlanDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name!: string;

  @IsEnum(SUBSCRIPTION_TIERS)
  tier!: SubscriptionPlan['tier'];

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price!: number;

  @IsEnum(SUBSCRIPTION_BILLING_CYCLES)
  billingCycle!: SubscriptionPlan['billingCycle'];

  @IsEnum(SUBSCRIPTION_PLAN_STATUS)
  status!: SubscriptionPlan['status'];
}
