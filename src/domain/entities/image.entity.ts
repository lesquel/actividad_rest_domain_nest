import type { Dish } from './dish.entity.js';
import type { DiningTable } from './table.entity.js';
import type { LayoutObject } from './layout-object.entity.js';
import type { Restaurant } from './restaurant.entity.js';

export interface Image {
  id: string;
  url: string;
  title?: string;
  description?: string;
  createdAt: Date;
  isActive: boolean;
  restaurants?: Restaurant[];
  tables?: DiningTable[];
  layoutObjects?: LayoutObject[];
  dishes?: Dish[];
}
