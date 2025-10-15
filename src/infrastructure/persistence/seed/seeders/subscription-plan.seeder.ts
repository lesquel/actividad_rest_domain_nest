import type { TypeOrmSubscriptionPlanRepository } from '../../repositories/subscription-plan.typeorm-repository.js';
import { subscriptionPlansSeedData } from '../data/subscription-plans.seed.js';

export async function seedSubscriptionPlans(
  subscriptionPlanRepo: TypeOrmSubscriptionPlanRepository,
): Promise<void> {
  console.log('Creando planes de suscripción...');

  for (const planData of subscriptionPlansSeedData) {
    await subscriptionPlanRepo.create(planData);
  }

  console.log(`${subscriptionPlansSeedData.length} planes creados\n`);
}
