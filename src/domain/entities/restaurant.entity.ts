import type { Image } from './image.entity.js';
import type { Menu } from './menu.entity.js';
import type { Reservation } from './reservation.entity.js';
import type { Review } from './review.entity.js';
import type { Section } from './section.entity.js';
import type { Subscription } from './subscription.entity.js';

export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  address: string;
  openingHours?: string;
  capacity: number;
  image?: Image | null;
  sections?: Section[];
  reservations?: Reservation[];
  reviews?: Review[];
  menus?: Menu[];
  subscriptions?: Subscription[];
}
