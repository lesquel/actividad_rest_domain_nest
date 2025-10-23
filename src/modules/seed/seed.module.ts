import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../infrastructure/persistence/persistence.module.js';
import { SeedController } from './seed.controller.js';
import { SeedService } from './seed.service.js';

@Module({
  imports: [PersistenceModule],
  controllers: [SeedController],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
