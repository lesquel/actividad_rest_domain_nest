import type { TypeOrmPaymentRepository } from '../../repositories/payment.typeorm-repository.js';
import type { TypeOrmUserRepository } from '../../repositories/user.typeorm-repository.js';
import type { TypeOrmReservationRepository } from '../../repositories/reservation.typeorm-repository.js';
import { paymentsSeedData } from '../data/payments.seed.js';

export async function seedPayments(
  paymentRepo: TypeOrmPaymentRepository,
  userRepo: TypeOrmUserRepository,
  reservationRepo: TypeOrmReservationRepository,
): Promise<void> {
  console.log('Creando pagos...');

  for (const paymentData of paymentsSeedData) {
    const { userId, reservationId, ...rest } = paymentData;
    const user = await userRepo.findById(userId);
    const reservation = await reservationRepo.findById(reservationId);

    if (user && reservation) {
      await paymentRepo.create({
        ...rest,
        user,
        reservation,
      });
    }
  }

  console.log(`${paymentsSeedData.length} pagos creados\n`);
}
