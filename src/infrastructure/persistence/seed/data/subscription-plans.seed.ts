import type { SubscriptionPlan } from '../../../../domain/entities/subscription-plan.entity.js';

export const subscriptionPlansSeedData: Omit<
  SubscriptionPlan,
  'subscriptions'
>[] = [
  {
    id: 'plan-001',
    name: 'Plan Básico',
    tier: 'BASIC',
    price: 29.99,
    billingCycle: 'MONTHLY',
    status: 'ACTIVE',
  },
  {
    id: 'plan-002',
    name: 'Plan Básico Anual',
    tier: 'BASIC',
    price: 299.99,
    billingCycle: 'YEARLY',
    status: 'ACTIVE',
  },
  {
    id: 'plan-003',
    name: 'Plan Premium',
    tier: 'PREMIUM',
    price: 79.99,
    billingCycle: 'MONTHLY',
    status: 'ACTIVE',
  },
  {
    id: 'plan-004',
    name: 'Plan Premium Anual',
    tier: 'PREMIUM',
    price: 799.99,
    billingCycle: 'YEARLY',
    status: 'ACTIVE',
  },
  {
    id: 'plan-005',
    name: 'Plan Empresarial',
    tier: 'ENTERPRISE',
    price: 199.99,
    billingCycle: 'MONTHLY',
    status: 'ACTIVE',
  },
];
