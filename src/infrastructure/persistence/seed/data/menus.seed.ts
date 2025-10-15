export interface MenuSeedData {
  id: string;
  restaurantId: string;
  name: string;
  description?: string;
  price?: number;
  coverImageUrl?: string;
}

export const menusSeedData: MenuSeedData[] = [
  {
    id: 'menu-001',
    restaurantId: 'rest-001',
    name: 'Menú Italiano',
    description: 'Selección de platos tradicionales italianos',
    price: 45.0,
    coverImageUrl: 'https://example.com/menus/italian-menu.jpg',
  },
  {
    id: 'menu-002',
    restaurantId: 'rest-001',
    name: 'Menú Ejecutivo',
    description: 'Opción rápida para almuerzos de negocios',
    price: 25.0,
    coverImageUrl: 'https://example.com/menus/business-menu.jpg',
  },
  {
    id: 'menu-003',
    restaurantId: 'rest-002',
    name: 'Omakase',
    description: 'Selección del chef - 12 piezas',
    price: 85.0,
    coverImageUrl: 'https://example.com/menus/omakase.jpg',
  },
  {
    id: 'menu-004',
    restaurantId: 'rest-002',
    name: 'Menú Vegetariano',
    description: 'Opciones vegetarianas y veganas',
    price: 38.0,
    coverImageUrl: 'https://example.com/menus/vegetarian.jpg',
  },
  {
    id: 'menu-005',
    restaurantId: 'rest-003',
    name: 'Parrillada Completa',
    description: 'Variedad de carnes premium a la parrilla',
    price: 95.0,
    coverImageUrl: 'https://example.com/menus/grill.jpg',
  },
];
