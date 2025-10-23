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

import type { ReservationStatus } from '../../../domain/entities/reservation.entity.js';
import { RESERVATION_STATUS_VALUES } from './reservation-status.constants.js';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReservationDto {
  @ApiPropertyOptional({
    description: 'Identificador del usuario asignado a la reserva',
    format: 'uuid',
    example: '40e9964a-0f46-4c0f-92a6-e21a6a2ec10b',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Identificador del restaurante de la reserva',
    format: 'uuid',
    example: 'd2f63148-c7c4-485d-a26d-fb6da231f80c',
  })
  @IsOptional()
  @IsUUID()
  restaurantId?: string;

  @ApiPropertyOptional({
    description: 'Identificador de la mesa asignada',
    format: 'uuid',
    example: '6e93ba19-fa2a-4f76-bd3c-7b396f9a5d7b',
  })
  @IsOptional()
  @IsUUID()
  tableId?: string;

  @ApiPropertyOptional({
    description: 'Fecha de la reserva (ISO8601)',
    example: '2025-09-12T00:00:00.000Z',
  })
  @IsOptional()
  @IsISO8601()
  reservationDate?: string;

  @ApiPropertyOptional({
    description: 'Hora de la reserva en formato HH:mm',
    example: '21:00',
    pattern: '^\\d{2}:\\d{2}$',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{2}:\d{2}$/)
  reservationTime?: string;

  @ApiPropertyOptional({
    description: 'Número de comensales',
    type: Number,
    minimum: 1,
    example: 6,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  guestCount?: number;

  @ApiPropertyOptional({
    description: 'Estado actualizado de la reserva',
    enum: RESERVATION_STATUS_VALUES,
    example: 'CONFIRMED',
  })
  @IsOptional()
  @IsEnum(RESERVATION_STATUS_VALUES)
  status?: ReservationStatus;

  @ApiPropertyOptional({
    description: 'Notas adicionales para el servicio',
    maxLength: 500,
    example: 'Confirmaron asistencia de 6 personas.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}
