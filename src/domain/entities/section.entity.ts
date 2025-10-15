import type { LayoutObject } from './layout-object.entity.js';
import type { Restaurant } from './restaurant.entity.js';
import type { DiningTable } from './table.entity.js';

export interface Section {
  id: string;
  restaurant: Restaurant;
  name: string;
  description?: string;
  tables?: DiningTable[];
  layoutObjects?: LayoutObject[];
}
