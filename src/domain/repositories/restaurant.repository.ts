import type { Restaurant } from '../entities/restaurant.entity.js';
import type { BaseRepository } from './base-repository.js';

export interface RestaurantRepository extends BaseRepository<Restaurant> {}
