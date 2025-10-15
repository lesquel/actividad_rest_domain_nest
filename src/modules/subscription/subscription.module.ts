import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../infrastructure/persistence/persistence.module.js';
import { SubscriptionController } from './subscription.controller.js';
import { SubscriptionService } from './subscription.service.js';

@Module({
  imports: [PersistenceModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
