import type { TypeOrmImageRepository } from '../../repositories/image.typeorm-repository.js';
import { imagesSeedData } from '../data/images.seed.js';

export async function seedImages(
  imageRepo: TypeOrmImageRepository,
): Promise<void> {
  console.log('Creando imágenes...');

  for (const imageData of imagesSeedData) {
    await imageRepo.create(imageData);
  }

  console.log(`${imagesSeedData.length} imágenes creadas\n`);
}
