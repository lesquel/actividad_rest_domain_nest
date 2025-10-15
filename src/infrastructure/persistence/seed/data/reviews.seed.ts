export interface ReviewSeedData {
  id: string;
  userId: string;
  restaurantId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

export const reviewsSeedData: ReviewSeedData[] = [
  {
    id: 'rev-001',
    userId: 'user-001',
    restaurantId: 'rest-001',
    rating: 5,
    comment:
      'Excelente comida italiana, el servicio fue impecable. La pasta carbonara estaba deliciosa.',
    createdAt: new Date('2024-10-16T10:00:00Z'),
  },
  {
    id: 'rev-002',
    userId: 'user-002',
    restaurantId: 'rest-002',
    rating: 5,
    comment:
      'Mejor sushi de la ciudad. Ambiente perfecto para una cena romántica.',
    createdAt: new Date('2024-10-17T09:30:00Z'),
  },
  {
    id: 'rev-003',
    userId: 'user-004',
    restaurantId: 'rest-001',
    rating: 4,
    comment:
      'Muy buena experiencia. El menú ejecutivo es excelente relación calidad-precio.',
    createdAt: new Date('2024-10-11T15:00:00Z'),
  },
  {
    id: 'rev-004',
    userId: 'user-003',
    restaurantId: 'rest-003',
    rating: 5,
    comment:
      'La mejor parrilla argentina que he probado. Carne de primera calidad.',
    createdAt: new Date('2024-09-20T18:00:00Z'),
  },
  {
    id: 'rev-005',
    userId: 'user-005',
    restaurantId: 'rest-002',
    rating: 4,
    comment:
      'Buena comida, aunque tuve que cancelar mi reserva por motivos personales. El proceso de reembolso fue rápido.',
    createdAt: new Date('2024-10-13T12:00:00Z'),
  },
  {
    id: 'rev-006',
    userId: 'user-001',
    restaurantId: 'rest-003',
    rating: 5,
    comment: 'Increíble experiencia. El área VIP es fantástica.',
    createdAt: new Date('2024-08-15T20:00:00Z'),
  },
];
