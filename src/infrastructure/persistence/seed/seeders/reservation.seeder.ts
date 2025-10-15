import type { TypeOrmReservationRepository } from '../../repositories/reservation.typeorm-repository.js';
import type { TypeOrmUserRepository } from '../../repositories/user.typeorm-repository.js';
import type { TypeOrmRestaurantRepository } from '../../repositories/restaurant.typeorm-repository.js';
import type { TypeOrmTableRepository } from '../../repositories/table.typeorm-repository.js';
import { reservationsSeedData } from '../data/reservations.seed.js';

export async function seedReservations(
  reservationRepo: TypeOrmReservationRepository,
  userRepo: TypeOrmUserRepository,
  restaurantRepo: TypeOrmRestaurantRepository,
  tableRepo: TypeOrmTableRepository,
): Promise<void> {
  console.log('Creando reservaciones...');

  for (const reservationData of reservationsSeedData) {
    const { userId, restaurantId, tableId, ...rest } = reservationData;
    const user = await userRepo.findById(userId);
    const restaurant = await restaurantRepo.findById(restaurantId);
    const table = await tableRepo.findById(tableId);

    if (user && restaurant && table) {
      await reservationRepo.create({
        ...rest,
        user,
        restaurant,
        table,
      });
    }
  }

  console.log(`${reservationsSeedData.length} reservaciones creadas\n`);
}
