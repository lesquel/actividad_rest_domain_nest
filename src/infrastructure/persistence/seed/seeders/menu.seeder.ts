import type { TypeOrmMenuRepository } from '../../repositories/menu.typeorm-repository.js';
import type { TypeOrmRestaurantRepository } from '../../repositories/restaurant.typeorm-repository.js';
import { menusSeedData } from '../data/menus.seed.js';

export async function seedMenus(
  menuRepo: TypeOrmMenuRepository,
  restaurantRepo: TypeOrmRestaurantRepository,
): Promise<void> {
  console.log('Creando menús...');

  for (const menuData of menusSeedData) {
    const { restaurantId, ...rest } = menuData;
    const restaurant = await restaurantRepo.findById(restaurantId);

    if (restaurant) {
      await menuRepo.create({
        ...rest,
        restaurant,
      });
    }
  }

  console.log(`${menusSeedData.length} menús creados\n`);
}
