import 'reflect-metadata';

import { join } from 'node:path';

import { DataSource } from 'typeorm';

import { DishOrmEntity } from '../persistence/entities/dish.orm-entity.js';
import { ImageOrmEntity } from '../persistence/entities/image.orm-entity.js';
import { LayoutObjectOrmEntity } from '../persistence/entities/layout-object.orm-entity.js';
import { MenuOrmEntity } from '../persistence/entities/menu.orm-entity.js';
import { PaymentOrmEntity } from '../persistence/entities/payment.orm-entity.js';
import { ReservationOrmEntity } from '../persistence/entities/reservation.orm-entity.js';
import { RestaurantOrmEntity } from '../persistence/entities/restaurant.orm-entity.js';
import { ReviewOrmEntity } from '../persistence/entities/review.orm-entity.js';
import { SectionLayoutObjectOrmEntity } from '../persistence/entities/section-layout-object.orm-entity.js';
import { SectionOrmEntity } from '../persistence/entities/section.orm-entity.js';
import { SubscriptionOrmEntity } from '../persistence/entities/subscription.orm-entity.js';
import { SubscriptionPlanOrmEntity } from '../persistence/entities/subscription-plan.orm-entity.js';
import { TableOrmEntity } from '../persistence/entities/table.orm-entity.js';
import { UserOrmEntity } from '../persistence/entities/user.orm-entity.js';

const defaultDatabasePath = join(process.cwd(), 'orm-domain.sqlite');

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_PATH ?? defaultDatabasePath,
  synchronize: true,
  logging: process.env.TYPEORM_LOGGING === 'true',
  entities: [
    UserOrmEntity,
    RestaurantOrmEntity,
    SectionOrmEntity,
    SectionLayoutObjectOrmEntity,
    LayoutObjectOrmEntity,
    TableOrmEntity,
    ImageOrmEntity,
    ReservationOrmEntity,
    PaymentOrmEntity,
    ReviewOrmEntity,
    SubscriptionPlanOrmEntity,
    SubscriptionOrmEntity,
    MenuOrmEntity,
    DishOrmEntity,
  ],
});
