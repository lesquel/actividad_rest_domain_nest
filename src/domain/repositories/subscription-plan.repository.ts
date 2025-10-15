import type { SubscriptionPlan } from '../entities/subscription-plan.entity.js';
import type { BaseRepository } from './base-repository.js';

export interface SubscriptionPlanRepository
  extends BaseRepository<SubscriptionPlan> {}
