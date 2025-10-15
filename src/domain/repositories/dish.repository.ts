import type { Dish } from '../entities/dish.entity.js';
import type { BaseRepository } from './base-repository.js';

export interface DishRepository extends BaseRepository<Dish> {}
