import type { TypeOrmRestaurantRepository } from '../../repositories/restaurant.typeorm-repository.js';
import type { TypeOrmImageRepository } from '../../repositories/image.typeorm-repository.js';
import { restaurantsSeedData } from '../data/restaurants.seed.js';

export async function seedRestaurants(
  restaurantRepo: TypeOrmRestaurantRepository,
  imageRepo: TypeOrmImageRepository,
): Promise<void> {
  console.log('Creando restaurantes...');

  for (const restaurantData of restaurantsSeedData) {
    const { imageId, ...rest } = restaurantData;
    const image = imageId ? await imageRepo.findById(imageId) : null;

    await restaurantRepo.create({
      ...rest,
      image: image || undefined,
    });
  }

  console.log(`${restaurantsSeedData.length} restaurantes creados\n`);
}
