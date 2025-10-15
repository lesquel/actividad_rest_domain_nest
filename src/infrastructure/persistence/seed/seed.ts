import 'reflect-metadata';
import { AppDataSource } from '../../config/typeorm.config.js';
import {
  TypeOrmUserRepository,
  TypeOrmSubscriptionPlanRepository,
  TypeOrmImageRepository,
  TypeOrmRestaurantRepository,
  TypeOrmSectionRepository,
  TypeOrmTableRepository,
  TypeOrmMenuRepository,
  TypeOrmDishRepository,
  TypeOrmReservationRepository,
  TypeOrmPaymentRepository,
  TypeOrmReviewRepository,
  TypeOrmSubscriptionRepository,
} from '../repositories/index.js';

import {
  seedUsers,
  seedSubscriptionPlans,
  seedImages,
  seedRestaurants,
  seedSections,
  seedTables,
  seedMenus,
  seedDishes,
  seedReservations,
  seedPayments,
  seedReviews,
  seedSubscriptions,
} from './seeders/index.js';

import { usersSeedData } from './data/users.seed.js';
import { subscriptionPlansSeedData } from './data/subscription-plans.seed.js';
import { imagesSeedData } from './data/images.seed.js';
import { restaurantsSeedData } from './data/restaurants.seed.js';
import { sectionsSeedData } from './data/sections.seed.js';
import { tablesSeedData } from './data/tables.seed.js';
import { menusSeedData } from './data/menus.seed.js';
import { dishesSeedData } from './data/dishes.seed.js';
import { reservationsSeedData } from './data/reservations.seed.js';
import { paymentsSeedData } from './data/payments.seed.js';
import { reviewsSeedData } from './data/reviews.seed.js';
import { subscriptionsSeedData } from './data/subscriptions.seed.js';

async function seedDatabase() {
  try {
    console.log('Iniciando proceso de seeding...\n');

    await AppDataSource.initialize();
    console.log('Conexión a la base de datos establecida\n');

    const userRepo = new TypeOrmUserRepository();
    const subscriptionPlanRepo = new TypeOrmSubscriptionPlanRepository();
    const imageRepo = new TypeOrmImageRepository();
    const restaurantRepo = new TypeOrmRestaurantRepository();
    const sectionRepo = new TypeOrmSectionRepository();
    const tableRepo = new TypeOrmTableRepository();
    const menuRepo = new TypeOrmMenuRepository();
    const dishRepo = new TypeOrmDishRepository();
    const reservationRepo = new TypeOrmReservationRepository();
    const paymentRepo = new TypeOrmPaymentRepository();
    const reviewRepo = new TypeOrmReviewRepository();
    const subscriptionRepo = new TypeOrmSubscriptionRepository();

    await seedUsers(userRepo);
    await seedSubscriptionPlans(subscriptionPlanRepo);
    await seedImages(imageRepo);
    await seedRestaurants(restaurantRepo, imageRepo);
    await seedSections(sectionRepo, restaurantRepo);
    await seedTables(tableRepo, sectionRepo, imageRepo);
    await seedMenus(menuRepo, restaurantRepo);
    await seedDishes(dishRepo, restaurantRepo, menuRepo, imageRepo);
    await seedReservations(
      reservationRepo,
      userRepo,
      restaurantRepo,
      tableRepo,
    );
    await seedPayments(paymentRepo, userRepo, reservationRepo);
    await seedReviews(reviewRepo, userRepo, restaurantRepo);
    await seedSubscriptions(
      subscriptionRepo,
      userRepo,
      restaurantRepo,
      subscriptionPlanRepo,
    );

    console.log('Proceso de seeding completado exitosamente!');
    console.log('\nResumen:');
    console.log(`  - Usuarios: ${usersSeedData.length}`);
    console.log(
      `  - Planes de suscripción: ${subscriptionPlansSeedData.length}`,
    );
    console.log(`  - Imágenes: ${imagesSeedData.length}`);
    console.log(`  - Restaurantes: ${restaurantsSeedData.length}`);
    console.log(`  - Secciones: ${sectionsSeedData.length}`);
    console.log(`  - Mesas: ${tablesSeedData.length}`);
    console.log(`  - Menús: ${menusSeedData.length}`);
    console.log(`  - Platos: ${dishesSeedData.length}`);
    console.log(`  - Reservaciones: ${reservationsSeedData.length}`);
    console.log(`  - Pagos: ${paymentsSeedData.length}`);
    console.log(`  - Reseñas: ${reviewsSeedData.length}`);
    console.log(`  - Suscripciones: ${subscriptionsSeedData.length}`);
  } catch (error) {
    console.error('Error durante el seeding:', error);
    throw error;
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('\nConexión a la base de datos cerrada');
    }
  }
}

seedDatabase()
  .then(() => {
    console.log('\nScript finalizado correctamente');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\nError fatal:', error);
    process.exit(1);
  });
