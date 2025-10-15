import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../infrastructure/persistence/persistence.module.js';
import { SubscriptionPlanController } from './subscription-plan.controller.js';
import { SubscriptionPlanService } from './subscription-plan.service.js';

@Module({
  imports: [PersistenceModule],
  controllers: [SubscriptionPlanController],
  providers: [SubscriptionPlanService],
  exports: [SubscriptionPlanService],
})
export class SubscriptionPlanModule {}
