import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../infrastructure/persistence/persistence.module.js';
import { ReviewController } from './review.controller.js';
import { ReviewService } from './review.service.js';

@Module({
  imports: [PersistenceModule],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
