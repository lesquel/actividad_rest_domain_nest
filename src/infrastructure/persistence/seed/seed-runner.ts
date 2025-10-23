import type {
  TypeOrmDishRepository,
  TypeOrmImageRepository,
  TypeOrmMenuRepository,
  TypeOrmPaymentRepository,
  TypeOrmReservationRepository,
  TypeOrmRestaurantRepository,
  TypeOrmReviewRepository,
  TypeOrmSectionRepository,
  TypeOrmSubscriptionPlanRepository,
  TypeOrmSubscriptionRepository,
  TypeOrmTableRepository,
  TypeOrmUserRepository,
} from '../repositories/index.js';
import {
  seedDishes,
  seedImages,
  seedMenus,
  seedPayments,
  seedReservations,
  seedRestaurants,
  seedReviews,
  seedSections,
  seedSubscriptionPlans,
  seedSubscriptions,
  seedTables,
  seedUsers,
} from './seeders/index.js';
import { dishesSeedData } from './data/dishes.seed.js';
import { imagesSeedData } from './data/images.seed.js';
import { menusSeedData } from './data/menus.seed.js';
import { paymentsSeedData } from './data/payments.seed.js';
import { reservationsSeedData } from './data/reservations.seed.js';
import { restaurantsSeedData } from './data/restaurants.seed.js';
import { reviewsSeedData } from './data/reviews.seed.js';
import { sectionsSeedData } from './data/sections.seed.js';
import { subscriptionPlansSeedData } from './data/subscription-plans.seed.js';
import { subscriptionsSeedData } from './data/subscriptions.seed.js';
import { tablesSeedData } from './data/tables.seed.js';
import { usersSeedData } from './data/users.seed.js';

export interface SeedDependencies {
  userRepo: TypeOrmUserRepository;
  subscriptionPlanRepo: TypeOrmSubscriptionPlanRepository;
  imageRepo: TypeOrmImageRepository;
  restaurantRepo: TypeOrmRestaurantRepository;
  sectionRepo: TypeOrmSectionRepository;
  tableRepo: TypeOrmTableRepository;
  menuRepo: TypeOrmMenuRepository;
  dishRepo: TypeOrmDishRepository;
  reservationRepo: TypeOrmReservationRepository;
  paymentRepo: TypeOrmPaymentRepository;
  reviewRepo: TypeOrmReviewRepository;
  subscriptionRepo: TypeOrmSubscriptionRepository;
}

export interface SeedSummary {
  users: number;
  subscriptionPlans: number;
  images: number;
  restaurants: number;
  sections: number;
  tables: number;
  menus: number;
  dishes: number;
  reservations: number;
  payments: number;
  reviews: number;
  subscriptions: number;
}

export async function executeSeed(
  dependencies: SeedDependencies,
): Promise<SeedSummary> {
  const {
    userRepo,
    subscriptionPlanRepo,
    imageRepo,
    restaurantRepo,
    sectionRepo,
    tableRepo,
    menuRepo,
    dishRepo,
    reservationRepo,
    paymentRepo,
    reviewRepo,
    subscriptionRepo,
  } = dependencies;

  await seedUsers(userRepo);
  await seedSubscriptionPlans(subscriptionPlanRepo);
  await seedImages(imageRepo);
  await seedRestaurants(restaurantRepo, imageRepo);
  await seedSections(sectionRepo, restaurantRepo);
  await seedTables(tableRepo, sectionRepo, imageRepo);
  await seedMenus(menuRepo, restaurantRepo);
  await seedDishes(dishRepo, restaurantRepo, menuRepo, imageRepo);
  await seedReservations(reservationRepo, userRepo, restaurantRepo, tableRepo);
  await seedPayments(paymentRepo, userRepo, reservationRepo);
  await seedReviews(reviewRepo, userRepo, restaurantRepo);
  await seedSubscriptions(
    subscriptionRepo,
    userRepo,
    restaurantRepo,
    subscriptionPlanRepo,
  );

  return {
    users: usersSeedData.length,
    subscriptionPlans: subscriptionPlansSeedData.length,
    images: imagesSeedData.length,
    restaurants: restaurantsSeedData.length,
    sections: sectionsSeedData.length,
    tables: tablesSeedData.length,
    menus: menusSeedData.length,
    dishes: dishesSeedData.length,
    reservations: reservationsSeedData.length,
    payments: paymentsSeedData.length,
    reviews: reviewsSeedData.length,
    subscriptions: subscriptionsSeedData.length,
  };
}
