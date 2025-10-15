import type { Image } from './image.entity.js';
import type { Reservation } from './reservation.entity.js';
import type { Section } from './section.entity.js';

export interface DiningTable {
  id: string;
  section: Section;
  tableNumber: number;
  capacity: number;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  image?: Image | null;
  reservations?: Reservation[];
}
