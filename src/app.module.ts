import { Module } from '@nestjs/common';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserModule } from './modules/user/user.module.js';
import { DishModule } from './modules/dish/dish.module.js';
import { ImageModule } from './modules/image/image.module.js';
import { LayoutObjectModule } from './modules/layout-object/layout-object.module.js';
import { MenuModule } from './modules/menu/menu.module.js';
import { PaymentModule } from './modules/payment/payment.module.js';
import { ReservationModule } from './modules/reservation/reservation.module.js';
import { RestaurantModule } from './modules/restaurant/restaurant.module.js';
import { ReviewModule } from './modules/review/review.module.js';
import { SectionModule } from './modules/section/section.module.js';
import { SubscriptionPlanModule } from './modules/subscription-plan/subscription-plan.module.js';
import { TableModule } from './modules/table/table.module.js';
import { SeedModule } from './modules/seed/seed.module.js';
import { SubscriptionModule } from './modules/subscription/subscription.module.js';

@Module({
  imports: [
    SubscriptionModule,
    UserModule,
    DishModule,
    ImageModule,
    LayoutObjectModule,
    MenuModule,
    PaymentModule,
    ReservationModule,
    RestaurantModule,
    ReviewModule,
    SectionModule,
    SubscriptionPlanModule,
    TableModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
