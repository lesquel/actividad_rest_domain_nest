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

export class UpdateReservationDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsUUID()
  restaurantId?: string;

  @IsOptional()
  @IsUUID()
  tableId?: string;

  @IsOptional()
  @IsISO8601()
  reservationDate?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{2}:\d{2}$/)
  reservationTime?: string;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  guestCount?: number;

  @IsOptional()
  @IsEnum(RESERVATION_STATUS_VALUES)
  status?: ReservationStatus;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}
