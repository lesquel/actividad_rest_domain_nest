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

import type { ReservationStatus } from '../../../domain/entities/reservation.entity.js';
import { RESERVATION_STATUS_VALUES } from './reservation-status.constants.js';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({
    description: 'Identificador del usuario que realiza la reserva',
    format: 'uuid',
    example: '40e9964a-0f46-4c0f-92a6-e21a6a2ec10b',
  })
  @IsUUID()
  userId!: string;

  @ApiProperty({
    description: 'Identificador del restaurante donde se realizará la reserva',
    format: 'uuid',
    example: 'd2f63148-c7c4-485d-a26d-fb6da231f80c',
  })
  @IsUUID()
  restaurantId!: string;

  @ApiProperty({
    description: 'Identificador de la mesa asignada',
    format: 'uuid',
    example: '6e93ba19-fa2a-4f76-bd3c-7b396f9a5d7b',
  })
  @IsUUID()
  tableId!: string;

  @ApiProperty({
    description: 'Fecha de la reserva en formato ISO8601',
    example: '2025-09-12T00:00:00.000Z',
  })
  @IsISO8601()
  reservationDate!: string;

  @ApiProperty({
    description: 'Hora de la reserva en formato HH:mm (24h)',
    example: '20:30',
    pattern: '^\\d{2}:\\d{2}$',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{2}:\d{2}$/)
  reservationTime!: string;

  @ApiProperty({
    description: 'Número de comensales incluidos en la reserva',
    type: Number,
    minimum: 1,
    example: 4,
  })
  @Type(() => Number)
  @Min(1)
  guestCount!: number;

  @ApiPropertyOptional({
    description: 'Estado inicial de la reserva',
    enum: RESERVATION_STATUS_VALUES,
    example: 'PENDING',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(RESERVATION_STATUS_VALUES)
  status?: ReservationStatus;

  @ApiPropertyOptional({
    description: 'Notas adicionales para el staff',
    maxLength: 500,
    example: 'Celebración de aniversario, requiere decoración especial.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}
