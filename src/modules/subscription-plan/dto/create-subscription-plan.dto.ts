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
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionPlanDto {
  @ApiProperty({
    description: 'Nombre comercial del plan de suscripción',
    maxLength: 120,
    example: 'Plan Profesional',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name!: string;

  @ApiProperty({
    description: 'Nivel o categoría del plan',
    enum: SUBSCRIPTION_TIERS,
    example: 'PREMIUM',
  })
  @IsEnum(SUBSCRIPTION_TIERS)
  tier!: SubscriptionPlan['tier'];

  @ApiProperty({
    description: 'Precio unitario del plan en la moneda configurada',
    type: Number,
    minimum: 0,
    example: 1499,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({
    description: 'Frecuencia de cobro del plan',
    enum: SUBSCRIPTION_BILLING_CYCLES,
    example: 'MONTHLY',
  })
  @IsEnum(SUBSCRIPTION_BILLING_CYCLES)
  billingCycle!: SubscriptionPlan['billingCycle'];

  @ApiProperty({
    description: 'Estado actual del plan',
    enum: SUBSCRIPTION_PLAN_STATUS,
    example: 'ACTIVE',
  })
  @IsEnum(SUBSCRIPTION_PLAN_STATUS)
  status!: SubscriptionPlan['status'];
}
