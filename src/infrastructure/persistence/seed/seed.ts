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
import { executeSeed } from './seed-runner.js';

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

    const summary = await executeSeed({
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
    });

    console.log('Proceso de seeding completado exitosamente!');
    console.log('\nResumen:');
    console.log(`  - Usuarios: ${summary.users}`);
    console.log(`  - Planes de suscripcion: ${summary.subscriptionPlans}`);
    console.log(`  - Imagenes: ${summary.images}`);
    console.log(`  - Restaurantes: ${summary.restaurants}`);
    console.log(`  - Secciones: ${summary.sections}`);
    console.log(`  - Mesas: ${summary.tables}`);
    console.log(`  - Menus: ${summary.menus}`);
    console.log(`  - Platos: ${summary.dishes}`);
    console.log(`  - Reservaciones: ${summary.reservations}`);
    console.log(`  - Pagos: ${summary.payments}`);
    console.log(`  - Resenas: ${summary.reviews}`);
    console.log(`  - Suscripciones: ${summary.subscriptions}`);
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
