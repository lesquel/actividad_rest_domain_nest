import { Type } from 'class-transformer';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
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

export class CreatePaymentDto {
  @IsUUID()
  reservationId!: string;

  @IsUUID()
  userId!: string;

  @Type(() => Number)
  @Min(0)
  amount!: number;

  @IsString()
  @Matches(/^[A-Z]{3}$/)
  currency!: string;

  @IsEnum(PAYMENT_METHOD_VALUES)
  method!: Payment['method'];

  @IsEnum(PAYMENT_STATUS_VALUES)
  status!: Payment['status'];

  @IsISO8601()
  paidAt!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  reference?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}
