import type { TypeOrmSectionRepository } from '../../repositories/section.typeorm-repository.js';
import type { TypeOrmRestaurantRepository } from '../../repositories/restaurant.typeorm-repository.js';
import { sectionsSeedData } from '../data/sections.seed.js';

export async function seedSections(
  sectionRepo: TypeOrmSectionRepository,
  restaurantRepo: TypeOrmRestaurantRepository,
): Promise<void> {
  console.log('Creando secciones...');

  for (const sectionData of sectionsSeedData) {
    const { restaurantId, ...rest } = sectionData;
    const restaurant = await restaurantRepo.findById(restaurantId);

    if (restaurant) {
      await sectionRepo.create({
        ...rest,
        restaurant,
      });
    }
  }

  console.log(`${sectionsSeedData.length} secciones creadas\n`);
}
