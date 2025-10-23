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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'Identificador de la reservación asociada al pago',
    format: 'uuid',
    example: '3e4a32bc-70d4-4ef0-93c4-9be9a5775d6c',
  })
  @IsUUID()
  reservationId!: string;

  @ApiProperty({
    description: 'Identificador del usuario que realiza el pago',
    format: 'uuid',
    example: '8849224a-bd89-4c83-954c-c38c8174d879',
  })
  @IsUUID()
  userId!: string;

  @ApiProperty({
    description: 'Monto total pagado expresado en la moneda indicada',
    minimum: 0,
    type: Number,
    example: 850.75,
  })
  @Type(() => Number)
  @Min(0)
  amount!: number;

  @ApiProperty({
    description: 'Moneda del pago utilizando código ISO 4217',
    example: 'MXN',
  })
  @IsString()
  @Matches(/^[A-Z]{3}$/)
  currency!: string;

  @ApiProperty({
    description: 'Método de pago utilizado',
    enum: PAYMENT_METHOD_VALUES,
    example: 'CARD',
  })
  @IsEnum(PAYMENT_METHOD_VALUES)
  method!: Payment['method'];

  @ApiProperty({
    description: 'Estado actual del pago',
    enum: PAYMENT_STATUS_VALUES,
    example: 'PAID',
  })
  @IsEnum(PAYMENT_STATUS_VALUES)
  status!: Payment['status'];

  @ApiProperty({
    description: 'Fecha y hora en la que se realizó el pago (ISO8601)',
    example: '2025-05-18T17:25:43.511Z',
  })
  @IsISO8601()
  paidAt!: string;

  @ApiPropertyOptional({
    description: 'Referencia externa o número de comprobante',
    maxLength: 100,
    example: 'TICKET-982734',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  reference?: string;

  @ApiPropertyOptional({
    description: 'Notas adicionales relacionadas con el pago',
    maxLength: 500,
    example: 'Pago completado en caja principal con promoción de cliente frecuente.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}
