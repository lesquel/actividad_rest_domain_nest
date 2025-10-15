import type { Subscription } from '../entities/subscription.entity.js';
import type { BaseRepository } from './base-repository.js';

export interface SubscriptionRepository extends BaseRepository<Subscription> {}
