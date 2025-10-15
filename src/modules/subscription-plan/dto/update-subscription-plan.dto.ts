import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
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

export class UpdateSubscriptionPlanDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @IsOptional()
  @IsEnum(SUBSCRIPTION_TIERS)
  tier?: SubscriptionPlan['tier'];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsEnum(SUBSCRIPTION_BILLING_CYCLES)
  billingCycle?: SubscriptionPlan['billingCycle'];

  @IsOptional()
  @IsEnum(SUBSCRIPTION_PLAN_STATUS)
  status?: SubscriptionPlan['status'];
}
