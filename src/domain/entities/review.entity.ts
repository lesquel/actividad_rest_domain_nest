import type { Restaurant } from './restaurant.entity.js';
import type { User } from './user.entity.js';

export interface Review {
  id: string;
  user: User;
  restaurant: Restaurant;
  rating: number;
  comment?: string;
  createdAt: Date;
}
