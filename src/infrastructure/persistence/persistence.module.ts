import { Module, type Provider } from '@nestjs/common';
import type { DataSource } from 'typeorm';

import {
  DISH_REPOSITORY,
  IMAGE_REPOSITORY,
  LAYOUT_OBJECT_REPOSITORY,
  MENU_REPOSITORY,
  PAYMENT_REPOSITORY,
  RESERVATION_REPOSITORY,
  RESTAURANT_REPOSITORY,
  REVIEW_REPOSITORY,
  SECTION_REPOSITORY,
  SUBSCRIPTION_PLAN_REPOSITORY,
  SUBSCRIPTION_REPOSITORY,
  TABLE_REPOSITORY,
  USER_REPOSITORY,
} from '../../application/tokens.js';
import { AppDataSource } from '../config/typeorm.config.js';
import {
  TypeOrmDishRepository,
  TypeOrmImageRepository,
  TypeOrmLayoutObjectRepository,
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
} from './repositories/index.js';

const APP_DATA_SOURCE = Symbol('APP_DATA_SOURCE');

const dataSourceProvider: Provider = {
  provide: APP_DATA_SOURCE,
  useFactory: async (): Promise<DataSource> => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    return AppDataSource;
  },
};

const repositoryProviders: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useFactory: () => new TypeOrmUserRepository(),
    inject: [APP_DATA_SOURCE],
  },
  {
    provide: RESTAURANT_REPOSITORY,
    useFactory: () => new TypeOrmRestaurantRepository(),
    inject: [APP_DATA_SOURCE],
  },
  {
    provide: SECTION_REPOSITORY,
    useFactory: () => new TypeOrmSectionRepository(),
    inject: [APP_DATA_SOURCE],
  },
  {
    provide: TABLE_REPOSITORY,
    useFactory: () => new TypeOrmTableRepository(),
    inject: [APP_DATA_SOURCE],
  },
  {
    provide: IMAGE_REPOSITORY,
    useFactory: () => new TypeOrmImageRepository(),
    inject: [APP_DATA_SOURCE],
  },
  {
    provide: RESERVATION_REPOSITORY,
    useFactory: () => new TypeOrmReservationRepository(),
    inject: [APP_DATA_SOURCE],
  },
  {
    provide: PAYMENT_REPOSITORY,
    useFactory: () => new TypeOrmPaymentRepository(),
    inject: [APP_DATA_SOURCE],
  },
  {
    provide: REVIEW_REPOSITORY,
    useFactory: () => new TypeOrmReviewRepository(),
    inject: [APP_DATA_SOURCE],
  },
  {
    provide: SUBSCRIPTION_PLAN_REPOSITORY,
    useFactory: () => new TypeOrmSubscriptionPlanRepository(),
    inject: [APP_DATA_SOURCE],
  },
  {
    provide: SUBSCRIPTION_REPOSITORY,
    useFactory: () => new TypeOrmSubscriptionRepository(),
    inject: [APP_DATA_SOURCE],
  },
  {
    provide: MENU_REPOSITORY,
    useFactory: () => new TypeOrmMenuRepository(),
    inject: [APP_DATA_SOURCE],
  },
  {
    provide: DISH_REPOSITORY,
    useFactory: () => new TypeOrmDishRepository(),
    inject: [APP_DATA_SOURCE],
  },
  {
    provide: LAYOUT_OBJECT_REPOSITORY,
    useFactory: () => new TypeOrmLayoutObjectRepository(),
    inject: [APP_DATA_SOURCE],
  },
];

@Module({
  providers: [dataSourceProvider, ...repositoryProviders],
  exports: repositoryProviders,
})
export class PersistenceModule {}
