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
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSubscriptionPlanDto {
  @ApiPropertyOptional({
    description: 'Nombre del plan',
    maxLength: 120,
    example: 'Plan Profesional Plus',
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @ApiPropertyOptional({
    description: 'Nivel del plan',
    enum: SUBSCRIPTION_TIERS,
    example: 'ENTERPRISE',
  })
  @IsOptional()
  @IsEnum(SUBSCRIPTION_TIERS)
  tier?: SubscriptionPlan['tier'];

  @ApiPropertyOptional({
    description: 'Precio actualizado del plan',
    type: Number,
    minimum: 0,
    example: 1799,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({
    description: 'Frecuencia de cobro',
    enum: SUBSCRIPTION_BILLING_CYCLES,
    example: 'ANNUAL',
  })
  @IsOptional()
  @IsEnum(SUBSCRIPTION_BILLING_CYCLES)
  billingCycle?: SubscriptionPlan['billingCycle'];

  @ApiPropertyOptional({
    description: 'Estado del plan',
    enum: SUBSCRIPTION_PLAN_STATUS,
    example: 'INACTIVE',
  })
  @IsOptional()
  @IsEnum(SUBSCRIPTION_PLAN_STATUS)
  status?: SubscriptionPlan['status'];
}
