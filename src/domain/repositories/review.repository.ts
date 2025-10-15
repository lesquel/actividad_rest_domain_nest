import type { Review } from '../entities/review.entity.js';
import type { BaseRepository } from './base-repository.js';

export interface ReviewRepository extends BaseRepository<Review> {}
