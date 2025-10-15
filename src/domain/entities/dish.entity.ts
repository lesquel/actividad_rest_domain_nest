import type { Image } from './image.entity.js';
import type { Menu } from './menu.entity.js';
import type { Restaurant } from './restaurant.entity.js';

export interface Dish {
  id: string;
  restaurant: Restaurant;
  menu: Menu;
  name: string;
  description?: string;
  price: number;
  image?: Image | null;
}
