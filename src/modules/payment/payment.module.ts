import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../infrastructure/persistence/persistence.module.js';
import { PaymentController } from './payment.controller.js';
import { PaymentService } from './payment.service.js';

@Module({
  imports: [PersistenceModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
