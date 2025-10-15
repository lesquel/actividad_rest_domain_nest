import type { TypeOrmDishRepository } from '../../repositories/dish.typeorm-repository.js';
import type { TypeOrmRestaurantRepository } from '../../repositories/restaurant.typeorm-repository.js';
import type { TypeOrmMenuRepository } from '../../repositories/menu.typeorm-repository.js';
import type { TypeOrmImageRepository } from '../../repositories/image.typeorm-repository.js';
import { dishesSeedData } from '../data/dishes.seed.js';

export async function seedDishes(
  dishRepo: TypeOrmDishRepository,
  restaurantRepo: TypeOrmRestaurantRepository,
  menuRepo: TypeOrmMenuRepository,
  imageRepo: TypeOrmImageRepository,
): Promise<void> {
  console.log('Creando platos...');

  for (const dishData of dishesSeedData) {
    const { restaurantId, menuId, imageId, ...rest } = dishData;
    const restaurant = await restaurantRepo.findById(restaurantId);
    const menu = await menuRepo.findById(menuId);
    const image = imageId ? await imageRepo.findById(imageId) : null;

    if (restaurant && menu) {
      await dishRepo.create({
        ...rest,
        restaurant,
        menu,
        image: image || undefined,
      });
    }
  }

  console.log(`${dishesSeedData.length} platos creados\n`);
}
