import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../infrastructure/persistence/persistence.module.js';
import { ReservationController } from './reservation.controller.js';
import { ReservationService } from './reservation.service.js';

@Module({
  imports: [PersistenceModule],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {}
