import {
  IsEnum,
  IsISO8601,
  IsOptional,
  IsUUID,
  ValidateIf,
} from 'class-validator';

import type { Subscription } from '../../../domain/entities/subscription.entity.js';
import { SUBSCRIPTION_STATUS_VALUES } from './subscription.constants.js';

export class UpdateSubscriptionDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsUUID()
  restaurantId?: string;

  @IsOptional()
  @IsUUID()
  planId?: string;

  @IsOptional()
  @IsISO8601()
  startsOn?: string;

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsISO8601()
  endsOn?: string | null;

  @IsOptional()
  @IsEnum(SUBSCRIPTION_STATUS_VALUES)
  status?: Subscription['status'];
}
