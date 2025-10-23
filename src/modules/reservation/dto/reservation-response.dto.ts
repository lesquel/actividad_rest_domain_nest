import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { Reservation } from '../../../domain/entities/reservation.entity.js';
import { RESERVATION_STATUS_VALUES } from './reservation-status.constants.js';

export class ReservationResponseDto {
  @ApiProperty({
    description: 'Identificador único de la reserva',
    format: 'uuid',
    example: '52f61f3d-9f47-46f5-84a7-4cc39556b0d4',
  })
  id!: string;

  @ApiProperty({
    description: 'Identificador del usuario que realizó la reserva',
    format: 'uuid',
    example: '40e9964a-0f46-4c0f-92a6-e21a6a2ec10b',
  })
  userId!: string;

  @ApiProperty({
    description: 'Identificador del restaurante',
    format: 'uuid',
    example: 'd2f63148-c7c4-485d-a26d-fb6da231f80c',
  })
  restaurantId!: string;

  @ApiProperty({
    description: 'Identificador de la mesa asignada',
    format: 'uuid',
    example: '6e93ba19-fa2a-4f76-bd3c-7b396f9a5d7b',
  })
  tableId!: string;

  @ApiProperty({
    description: 'Fecha de la reserva en formato ISO8601',
    example: '2025-09-12T00:00:00.000Z',
  })
  reservationDate!: string;

  @ApiProperty({
    description: 'Hora de la reserva en formato HH:mm',
    example: '20:30',
  })
  reservationTime!: string;

  @ApiProperty({
    description: 'Número de comensales',
    type: Number,
    example: 4,
  })
  guestCount!: number;

  @ApiProperty({
    description: 'Estado actual de la reserva',
    enum: RESERVATION_STATUS_VALUES,
    example: 'CONFIRMED',
  })
  status!: Reservation['status'];

  @ApiPropertyOptional({
    description: 'Notas adicionales para el servicio',
    nullable: true,
    example: 'Llegarán 10 minutos antes para decorar la mesa.',
  })
  notes?: string;

  static fromDomain(reservation: Reservation): ReservationResponseDto {
    const dto = new ReservationResponseDto();
    dto.id = reservation.id;
    dto.userId = reservation.user.id;
    dto.restaurantId = reservation.restaurant.id;
    dto.tableId = reservation.table.id;
    dto.reservationDate = reservation.reservationDate.toISOString();
    dto.reservationTime = reservation.reservationTime;
    dto.guestCount = reservation.guestCount;
    dto.status = reservation.status;
    dto.notes = reservation.notes;
    return dto;
  }
}
