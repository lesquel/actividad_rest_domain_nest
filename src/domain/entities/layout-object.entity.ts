import type { Image } from './image.entity.js';
import type { Section } from './section.entity.js';

export interface LayoutObject {
  id: string;
  name?: string;
  type?: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  image?: Image | null;
  sections?: Section[];
}
