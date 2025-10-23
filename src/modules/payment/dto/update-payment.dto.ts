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
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePaymentDto {
  @ApiPropertyOptional({
    description: 'Identificador de la reservación asociada al pago',
    format: 'uuid',
    example: '3e4a32bc-70d4-4ef0-93c4-9be9a5775d6c',
  })
  @IsOptional()
  @IsUUID()
  reservationId?: string;

  @ApiPropertyOptional({
    description: 'Identificador del usuario pagador',
    format: 'uuid',
    example: '8849224a-bd89-4c83-954c-c38c8174d879',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Monto pagado',
    type: Number,
    minimum: 0,
    example: 850.75,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  amount?: number;

  @ApiPropertyOptional({
    description: 'Moneda del pago en formato ISO 4217',
    example: 'USD',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[A-Z]{3}$/)
  currency?: string;

  @ApiPropertyOptional({
    description: 'Método de pago utilizado',
    enum: PAYMENT_METHOD_VALUES,
    example: 'TRANSFER',
  })
  @IsOptional()
  @IsEnum(PAYMENT_METHOD_VALUES)
  method?: Payment['method'];

  @ApiPropertyOptional({
    description: 'Estado del pago',
    enum: PAYMENT_STATUS_VALUES,
    example: 'REFUNDED',
  })
  @IsOptional()
  @IsEnum(PAYMENT_STATUS_VALUES)
  status?: Payment['status'];

  @ApiPropertyOptional({
    description: 'Fecha del pago en formato ISO8601',
    example: '2025-05-18T17:25:43.511Z',
  })
  @IsOptional()
  @IsISO8601()
  paidAt?: string;

  @ApiPropertyOptional({
    description: 'Referencia externa o folio del pago',
    maxLength: 100,
    example: 'TICKET-982734',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  reference?: string;

  @ApiPropertyOptional({
    description: 'Notas relacionadas con el pago',
    maxLength: 500,
    example: 'Reembolso parcial por cancelación anticipada.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}
