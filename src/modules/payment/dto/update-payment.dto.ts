import { Type } from 'class-transformer';
import {
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';

import type { Payment } from '../../../domain/entities/payment.entity.js';
import {
  PAYMENT_METHOD_VALUES,
  PAYMENT_STATUS_VALUES,
} from './payment.constants.js';

export class UpdatePaymentDto {
  @IsOptional()
  @IsUUID()
  reservationId?: string;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  amount?: number;

  @IsOptional()
  @IsString()
  @Matches(/^[A-Z]{3}$/)
  currency?: string;

  @IsOptional()
  @IsEnum(PAYMENT_METHOD_VALUES)
  method?: Payment['method'];

  @IsOptional()
  @IsEnum(PAYMENT_STATUS_VALUES)
  status?: Payment['status'];

  @IsOptional()
  @IsISO8601()
  paidAt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  reference?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}
