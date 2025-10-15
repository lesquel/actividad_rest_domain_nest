import type { Reservation } from '../../../domain/entities/reservation.entity.js';

export class ReservationResponseDto {
  id!: string;
  userId!: string;
  restaurantId!: string;
  tableId!: string;
  reservationDate!: string;
  reservationTime!: string;
  guestCount!: number;
  status!: Reservation['status'];
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
