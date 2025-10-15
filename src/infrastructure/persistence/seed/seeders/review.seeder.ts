import type { TypeOrmReviewRepository } from '../../repositories/review.typeorm-repository.js';
import type { TypeOrmUserRepository } from '../../repositories/user.typeorm-repository.js';
import type { TypeOrmRestaurantRepository } from '../../repositories/restaurant.typeorm-repository.js';
import { reviewsSeedData } from '../data/reviews.seed.js';

export async function seedReviews(
  reviewRepo: TypeOrmReviewRepository,
  userRepo: TypeOrmUserRepository,
  restaurantRepo: TypeOrmRestaurantRepository,
): Promise<void> {
  console.log('Creando reseñas...');

  for (const reviewData of reviewsSeedData) {
    const { userId, restaurantId, ...rest } = reviewData;
    const user = await userRepo.findById(userId);
    const restaurant = await restaurantRepo.findById(restaurantId);

    if (user && restaurant) {
      await reviewRepo.create({
        ...rest,
        user,
        restaurant,
      });
    }
  }

  console.log(`${reviewsSeedData.length} reseñas creadas\n`);
}
