import type { Subscription } from './subscription.entity.js';

export type SubscriptionTier = 'BASIC' | 'PREMIUM' | 'ENTERPRISE';

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: SubscriptionTier;
  price: number;
  billingCycle: 'MONTHLY' | 'YEARLY';
  status: 'ACTIVE' | 'INACTIVE';
  subscriptions?: Subscription[];
}
