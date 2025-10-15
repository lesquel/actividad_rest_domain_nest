import type { Restaurant } from './restaurant.entity.js';
import type { SubscriptionPlan } from './subscription-plan.entity.js';
import type { User } from './user.entity.js';

export type SubscriptionStatus = 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'EXPIRED';

export interface Subscription {
  id: string;
  user: User;
  restaurant: Restaurant;
  plan: SubscriptionPlan;
  startsOn: Date;
  endsOn?: Date | null;
  status: SubscriptionStatus;
}
