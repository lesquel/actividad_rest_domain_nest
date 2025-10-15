import type { TypeOrmUserRepository } from '../../repositories/user.typeorm-repository.js';
import { usersSeedData } from '../data/users.seed.js';

export async function seedUsers(
  userRepo: TypeOrmUserRepository,
): Promise<void> {
  console.log('Creando usuarios...');

  for (const userData of usersSeedData) {
    await userRepo.create(userData);
  }

  console.log(`${usersSeedData.length} usuarios creados\n`);
}
