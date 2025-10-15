import type { Image } from '../entities/image.entity.js';
import type { BaseRepository } from './base-repository.js';

export interface ImageRepository extends BaseRepository<Image> {}
