export interface ReservationSeedData {
  id: string;
  userId: string;
  restaurantId: string;
  tableId: string;
  reservationDate: Date;
  reservationTime: string;
  guestCount: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  notes?: string;
}

export const reservationsSeedData: ReservationSeedData[] = [
  {
    id: 'res-001',
    userId: 'user-001',
    restaurantId: 'rest-001',
    tableId: 'table-003',
    reservationDate: new Date('2024-10-15T00:00:00Z'),
    reservationTime: '19:30',
    guestCount: 6,
    status: 'CONFIRMED',
    notes: 'Celebración de cumpleaños',
  },
  {
    id: 'res-002',
    userId: 'user-002',
    restaurantId: 'rest-002',
    tableId: 'table-006',
    reservationDate: new Date('2024-10-16T00:00:00Z'),
    reservationTime: '20:00',
    guestCount: 2,
    status: 'CONFIRMED',
    notes: 'Cena romántica',
  },
  {
    id: 'res-003',
    userId: 'user-003',
    restaurantId: 'rest-003',
    tableId: 'table-009',
    reservationDate: new Date('2024-10-17T00:00:00Z'),
    reservationTime: '21:00',
    guestCount: 4,
    status: 'PENDING',
    notes: undefined,
  },
  {
    id: 'res-004',
    userId: 'user-004',
    restaurantId: 'rest-001',
    tableId: 'table-001',
    reservationDate: new Date('2024-10-10T00:00:00Z'),
    reservationTime: '13:00',
    guestCount: 4,
    status: 'COMPLETED',
    notes: 'Almuerzo de negocios',
  },
  {
    id: 'res-005',
    userId: 'user-005',
    restaurantId: 'rest-002',
    tableId: 'table-007',
    reservationDate: new Date('2024-10-12T00:00:00Z'),
    reservationTime: '18:30',
    guestCount: 8,
    status: 'CANCELLED',
    notes: 'Reunión familiar - cancelada por enfermedad',
  },
  {
    id: 'res-006',
    userId: 'user-001',
    restaurantId: 'rest-003',
    tableId: 'table-008',
    reservationDate: new Date('2024-10-20T00:00:00Z'),
    reservationTime: '20:30',
    guestCount: 4,
    status: 'CONFIRMED',
    notes: undefined,
  },
];
