import type { Image } from '../../../../domain/entities/image.entity.js';

export const imagesSeedData: Omit<
  Image,
  'restaurants' | 'tables' | 'layoutObjects' | 'dishes'
>[] = [
  {
    id: 'img-001',
    url: 'https://example.com/images/restaurant-bella-italia.jpg',
    title: 'Bella Italia - Fachada',
    description: 'Vista frontal del restaurante',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    isActive: true,
  },
  {
    id: 'img-002',
    url: 'https://example.com/images/restaurant-sushi-zen.jpg',
    title: 'Sushi Zen - Interior',
    description: 'Ambiente acogedor y moderno',
    createdAt: new Date('2024-02-20T11:30:00Z'),
    isActive: true,
  },
  {
    id: 'img-003',
    url: 'https://example.com/images/restaurant-el-asador.jpg',
    title: 'El Asador - Terraza',
    description: 'Terraza con vista panorámica',
    createdAt: new Date('2024-03-10T09:15:00Z'),
    isActive: true,
  },
  {
    id: 'img-004',
    url: 'https://example.com/images/dish-pasta-carbonara.jpg',
    title: 'Pasta Carbonara',
    description: 'Pasta fresca con salsa cremosa',
    createdAt: new Date('2024-04-05T14:20:00Z'),
    isActive: true,
  },
  {
    id: 'img-005',
    url: 'https://example.com/images/dish-sushi-roll.jpg',
    title: 'California Roll',
    description: 'Rollo de sushi premium',
    createdAt: new Date('2024-04-08T15:45:00Z'),
    isActive: true,
  },
  {
    id: 'img-006',
    url: 'https://example.com/images/table-vip.jpg',
    title: 'Mesa VIP',
    description: 'Mesa reservada para ocasiones especiales',
    createdAt: new Date('2024-05-12T16:00:00Z'),
    isActive: true,
  },
];
