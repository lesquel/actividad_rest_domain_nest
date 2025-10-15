export interface SubscriptionSeedData {
  id: string;
  userId: string;
  restaurantId: string;
  planId: string;
  startsOn: Date;
  endsOn: Date | null;
  status: 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'EXPIRED';
}

export const subscriptionsSeedData: SubscriptionSeedData[] = [
  {
    id: 'sub-001',
    userId: 'user-001',
    restaurantId: 'rest-001',
    planId: 'plan-003',
    startsOn: new Date('2024-06-01T00:00:00Z'),
    endsOn: new Date('2025-06-01T00:00:00Z'),
    status: 'ACTIVE',
  },
  {
    id: 'sub-002',
    userId: 'user-002',
    restaurantId: 'rest-002',
    planId: 'plan-001',
    startsOn: new Date('2024-07-15T00:00:00Z'),
    endsOn: new Date('2025-07-15T00:00:00Z'),
    status: 'ACTIVE',
  },
  {
    id: 'sub-003',
    userId: 'user-003',
    restaurantId: 'rest-003',
    planId: 'plan-005',
    startsOn: new Date('2024-08-01T00:00:00Z'),
    endsOn: null,
    status: 'ACTIVE',
  },
  {
    id: 'sub-004',
    userId: 'user-004',
    restaurantId: 'rest-001',
    planId: 'plan-002',
    startsOn: new Date('2024-01-01T00:00:00Z'),
    endsOn: new Date('2024-12-31T23:59:59Z'),
    status: 'EXPIRED',
  },
];
