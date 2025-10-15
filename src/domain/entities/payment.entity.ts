import type { Reservation } from './reservation.entity.js';
import type { User } from './user.entity.js';

export type PaymentMethod = 'CASH' | 'CARD' | 'TRANSFER' | 'ONLINE';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface Payment {
  id: string;
  reservation: Reservation;
  user: User;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  paidAt: Date;
  reference?: string;
  notes?: string;
}
