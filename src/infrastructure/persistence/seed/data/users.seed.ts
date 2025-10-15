import type { User } from '../../../../domain/entities/user.entity.js';

export const usersSeedData: Omit<
  User,
  'reservations' | 'payments' | 'subscriptions' | 'reviews'
>[] = [
  {
    id: 'user-001',
    email: 'maria.garcia@example.com',
    names: 'María García',
    phone: '+593987654321',
  },
  {
    id: 'user-002',
    email: 'juan.perez@example.com',
    names: 'Juan Pérez',
    phone: '+593998765432',
  },
  {
    id: 'user-003',
    email: 'ana.martinez@example.com',
    names: 'Ana Martínez',
    phone: '+593976543210',
  },
  {
    id: 'user-004',
    email: 'carlos.rodriguez@example.com',
    names: 'Carlos Rodríguez',
    phone: '+593965432109',
  },
  {
    id: 'user-005',
    email: 'laura.fernandez@example.com',
    names: 'Laura Fernández',
    phone: '+593954321098',
  },
];
