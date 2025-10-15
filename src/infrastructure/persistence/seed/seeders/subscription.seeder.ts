import type { TypeOrmSubscriptionRepository } from '../../repositories/subscription.typeorm-repository.js';
import type { TypeOrmUserRepository } from '../../repositories/user.typeorm-repository.js';
import type { TypeOrmRestaurantRepository } from '../../repositories/restaurant.typeorm-repository.js';
import type { TypeOrmSubscriptionPlanRepository } from '../../repositories/subscription-plan.typeorm-repository.js';
import { subscriptionsSeedData } from '../data/subscriptions.seed.js';

export async function seedSubscriptions(
  subscriptionRepo: TypeOrmSubscriptionRepository,
  userRepo: TypeOrmUserRepository,
  restaurantRepo: TypeOrmRestaurantRepository,
  subscriptionPlanRepo: TypeOrmSubscriptionPlanRepository,
): Promise<void> {
  console.log('Creando suscripciones...');

  for (const subscriptionData of subscriptionsSeedData) {
    const { userId, restaurantId, planId, ...rest } = subscriptionData;
    const user = await userRepo.findById(userId);
    const restaurant = await restaurantRepo.findById(restaurantId);
    const plan = await subscriptionPlanRepo.findById(planId);

    if (user && restaurant && plan) {
      await subscriptionRepo.create({
        ...rest,
        user,
        restaurant,
        plan,
      });
    }
  }

  console.log(`${subscriptionsSeedData.length} suscripciones creadas\n`);
}
