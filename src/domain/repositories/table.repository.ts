import type { DiningTable } from '../entities/table.entity.js';
import type { BaseRepository } from './base-repository.js';

export interface TableRepository extends BaseRepository<DiningTable> {}
