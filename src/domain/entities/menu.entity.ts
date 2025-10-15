import type { Dish } from './dish.entity.js';
import type { Restaurant } from './restaurant.entity.js';

export interface Menu {
  id: string;
  restaurant: Restaurant;
  name: string;
  description?: string;
  price?: number;
  coverImageUrl?: string;
  dishes?: Dish[];
}
