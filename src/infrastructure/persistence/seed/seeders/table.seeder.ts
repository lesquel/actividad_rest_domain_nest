import type { TypeOrmTableRepository } from '../../repositories/table.typeorm-repository.js';
import type { TypeOrmSectionRepository } from '../../repositories/section.typeorm-repository.js';
import type { TypeOrmImageRepository } from '../../repositories/image.typeorm-repository.js';
import { tablesSeedData } from '../data/tables.seed.js';

export async function seedTables(
  tableRepo: TypeOrmTableRepository,
  sectionRepo: TypeOrmSectionRepository,
  imageRepo: TypeOrmImageRepository,
): Promise<void> {
  console.log('Creando mesas...');

  for (const tableData of tablesSeedData) {
    const { sectionId, imageId, ...rest } = tableData;
    const section = await sectionRepo.findById(sectionId);
    const image = imageId ? await imageRepo.findById(imageId) : null;

    if (section) {
      await tableRepo.create({
        ...rest,
        section,
        image: image || undefined,
      });
    }
  }

  console.log(`${tablesSeedData.length} mesas creadas\n`);
}
