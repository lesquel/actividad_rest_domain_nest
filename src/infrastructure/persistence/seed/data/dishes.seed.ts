export interface DishSeedData {
  id: string;
  restaurantId: string;
  menuId: string;
  name: string;
  description?: string;
  price: number;
  imageId: string | null;
}

export const dishesSeedData: DishSeedData[] = [
  {
    id: 'dish-001',
    restaurantId: 'rest-001',
    menuId: 'menu-001',
    name: 'Pasta Carbonara',
    description: 'Pasta fresca con pancetta, huevo y queso parmesano',
    price: 18.5,
    imageId: 'img-004',
  },
  {
    id: 'dish-002',
    restaurantId: 'rest-001',
    menuId: 'menu-001',
    name: 'Pizza Margherita',
    description: 'Pizza clásica con tomate, mozzarella y albahaca',
    price: 16.0,
    imageId: null,
  },
  {
    id: 'dish-003',
    restaurantId: 'rest-001',
    menuId: 'menu-001',
    name: 'Risotto ai Funghi',
    description: 'Arroz arborio con hongos porcini y trufa',
    price: 22.0,
    imageId: null,
  },
  {
    id: 'dish-004',
    restaurantId: 'rest-001',
    menuId: 'menu-002',
    name: 'Ensalada Caprese',
    description: 'Tomate, mozzarella fresca y albahaca',
    price: 12.0,
    imageId: null,
  },
  {
    id: 'dish-005',
    restaurantId: 'rest-002',
    menuId: 'menu-003',
    name: 'California Roll',
    description: 'Rollo de cangrejo, aguacate y pepino',
    price: 14.0,
    imageId: 'img-005',
  },
  {
    id: 'dish-006',
    restaurantId: 'rest-002',
    menuId: 'menu-003',
    name: 'Nigiri de Salmón',
    description: 'Salmón fresco sobre arroz de sushi',
    price: 16.0,
    imageId: null,
  },
  {
    id: 'dish-007',
    restaurantId: 'rest-002',
    menuId: 'menu-004',
    name: 'Tofu Teriyaki',
    description: 'Tofu marinado con salsa teriyaki y vegetales',
    price: 13.5,
    imageId: null,
  },
  {
    id: 'dish-008',
    restaurantId: 'rest-003',
    menuId: 'menu-005',
    name: 'Bife de Chorizo',
    description: 'Corte argentino premium 400g',
    price: 32.0,
    imageId: null,
  },
  {
    id: 'dish-009',
    restaurantId: 'rest-003',
    menuId: 'menu-005',
    name: 'Costillas de Cerdo',
    description: 'Costillas BBQ con guarnición',
    price: 28.0,
    imageId: null,
  },
  {
    id: 'dish-010',
    restaurantId: 'rest-003',
    menuId: 'menu-005',
    name: 'Chorizo Criollo',
    description: 'Chorizo casero a la parrilla',
    price: 15.0,
    imageId: null,
  },
];
