import type { DiningTable } from './table.entity.js';
import type { Payment } from './payment.entity.js';
import type { Restaurant } from './restaurant.entity.js';
import type { User } from './user.entity.js';

export type ReservationStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED';

export interface Reservation {
  id: string;
  user: User;
  restaurant: Restaurant;
  table: DiningTable;
  reservationDate: Date;
  reservationTime: string;
  guestCount: number;
  status: ReservationStatus;
  notes?: string;
  payments?: Payment[];
}
