export interface RestaurantSeedData {
  id: string;
  name: string;
  description?: string;
  address: string;
  openingHours?: string;
  capacity: number;
  imageId: string | null;
}

export const restaurantsSeedData: RestaurantSeedData[] = [
  {
    id: 'rest-001',
    name: 'Bella Italia',
    description: 'Auténtica cocina italiana en el corazón de la ciudad',
    address: 'Av. Principal 123, Centro',
    openingHours: 'Lun-Dom: 12:00 - 23:00',
    capacity: 80,
    imageId: 'img-001',
  },
  {
    id: 'rest-002',
    name: 'Sushi Zen',
    description: 'Experiencia japonesa contemporánea',
    address: 'Calle del Mar 456, Zona Norte',
    openingHours: 'Mar-Dom: 13:00 - 22:30',
    capacity: 60,
    imageId: 'img-002',
  },
  {
    id: 'rest-003',
    name: 'El Asador',
    description: 'Parrilla argentina premium',
    address: 'Av. Los Robles 789, Sector Sur',
    openingHours: 'Mié-Lun: 12:30 - 00:00',
    capacity: 100,
    imageId: 'img-003',
  },
];
