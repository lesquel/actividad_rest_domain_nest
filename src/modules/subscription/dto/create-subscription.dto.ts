import {
  IsEnum,
  IsISO8601,
  IsOptional,
  IsUUID,
  ValidateIf,
} from 'class-validator';

import type { Subscription } from '../../../domain/entities/subscription.entity.js';
import { SUBSCRIPTION_STATUS_VALUES } from './subscription.constants.js';

export class CreateSubscriptionDto {
  @IsUUID()
  userId!: string;

  @IsUUID()
  restaurantId!: string;

  @IsUUID()
  planId!: string;

  @IsISO8601()
  startsOn!: string;

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsISO8601()
  endsOn?: string | null;

  @IsOptional()
  @IsEnum(SUBSCRIPTION_STATUS_VALUES)
  status?: Subscription['status'];
}
