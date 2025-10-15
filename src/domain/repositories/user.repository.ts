import type { User } from '../entities/user.entity.js';
import type { BaseRepository } from './base-repository.js';

export interface UserRepository extends BaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
