import type { Payment } from './payment.entity.js';
import type { Reservation } from './reservation.entity.js';
import type { Review } from './review.entity.js';
import type { Subscription } from './subscription.entity.js';

export interface User {
  id: string;
  email: string;
  names: string;
  phone: string;
  reservations?: Reservation[];
  payments?: Payment[];
  subscriptions?: Subscription[];
  reviews?: Review[];
}
