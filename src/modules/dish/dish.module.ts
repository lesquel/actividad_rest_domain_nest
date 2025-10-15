import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../infrastructure/persistence/persistence.module.js';
import { DishController } from './dish.controller.js';
import { DishService } from './dish.service.js';

@Module({
  imports: [PersistenceModule],
  controllers: [DishController],
  providers: [DishService],
  exports: [DishService],
})
export class DishModule {}
