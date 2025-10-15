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

export class CreateReservationDto {
  @IsUUID()
  userId!: string;

  @IsUUID()
  restaurantId!: string;

  @IsUUID()
  tableId!: string;

  @IsISO8601()
  reservationDate!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{2}:\d{2}$/)
  reservationTime!: string;

  @Type(() => Number)
  @Min(1)
  guestCount!: number;

  @IsOptional()
  @IsEnum(RESERVATION_STATUS_VALUES)
  status?: ReservationStatus;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}
