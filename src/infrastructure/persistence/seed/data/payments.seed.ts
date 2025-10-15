export interface PaymentSeedData {
  id: string;
  reservationId: string;
  userId: string;
  amount: number;
  currency: string;
  method: 'CASH' | 'CARD' | 'TRANSFER' | 'ONLINE';
  status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  paidAt: Date;
  reference?: string;
  notes?: string;
}

export const paymentsSeedData: PaymentSeedData[] = [
  {
    id: 'pay-001',
    reservationId: 'res-001',
    userId: 'user-001',
    amount: 135.5,
    currency: 'USD',
    method: 'CARD',
    status: 'PAID',
    paidAt: new Date('2024-10-15T21:45:00Z'),
    reference: 'TXN-2024-10-15-001',
    notes: 'Pago incluye propina',
  },
  {
    id: 'pay-002',
    reservationId: 'res-002',
    userId: 'user-002',
    amount: 98.0,
    currency: 'USD',
    method: 'ONLINE',
    status: 'PAID',
    paidAt: new Date('2024-10-16T22:30:00Z'),
    reference: 'TXN-2024-10-16-002',
    notes: undefined,
  },
  {
    id: 'pay-003',
    reservationId: 'res-003',
    userId: 'user-003',
    amount: 150.0,
    currency: 'USD',
    method: 'CARD',
    status: 'PENDING',
    paidAt: new Date('2024-10-17T00:00:00Z'),
    reference: undefined,
    notes: 'Pago pendiente de confirmación',
  },
  {
    id: 'pay-004',
    reservationId: 'res-004',
    userId: 'user-004',
    amount: 75.0,
    currency: 'USD',
    method: 'CASH',
    status: 'PAID',
    paidAt: new Date('2024-10-10T14:30:00Z'),
    reference: undefined,
    notes: 'Pago en efectivo',
  },
  {
    id: 'pay-005',
    reservationId: 'res-005',
    userId: 'user-005',
    amount: 50.0,
    currency: 'USD',
    method: 'TRANSFER',
    status: 'REFUNDED',
    paidAt: new Date('2024-10-11T10:00:00Z'),
    reference: 'TXN-2024-10-11-005',
    notes: 'Reembolso por cancelación',
  },
];
