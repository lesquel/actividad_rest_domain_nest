import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../infrastructure/persistence/persistence.module.js';
import { RestaurantController } from './restaurant.controller.js';
import { RestaurantService } from './restaurant.service.js';

@Module({
  imports: [PersistenceModule],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
