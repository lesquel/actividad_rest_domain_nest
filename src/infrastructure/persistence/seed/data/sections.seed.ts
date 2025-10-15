export interface SectionSeedData {
  id: string;
  restaurantId: string;
  name: string;
  description?: string;
}

export const sectionsSeedData: SectionSeedData[] = [
  {
    id: 'sec-001',
    restaurantId: 'rest-001',
    name: 'Salón Principal',
    description:
      'Área principal del restaurante con capacidad para 40 personas',
  },
  {
    id: 'sec-002',
    restaurantId: 'rest-001',
    name: 'Terraza',
    description: 'Terraza al aire libre con vista a la ciudad',
  },
  {
    id: 'sec-003',
    restaurantId: 'rest-002',
    name: 'Barra de Sushi',
    description: 'Zona de barra con vista a la cocina',
  },
  {
    id: 'sec-004',
    restaurantId: 'rest-002',
    name: 'Sala Privada',
    description: 'Ambiente íntimo para grupos pequeños',
  },
  {
    id: 'sec-005',
    restaurantId: 'rest-003',
    name: 'Parrilla',
    description: 'Zona con vista a la parrilla en vivo',
  },
  {
    id: 'sec-006',
    restaurantId: 'rest-003',
    name: 'VIP',
    description: 'Área exclusiva con servicio premium',
  },
];
