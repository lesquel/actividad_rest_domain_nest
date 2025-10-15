import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../infrastructure/persistence/persistence.module.js';
import { SectionController } from './section.controller.js';
import { SectionService } from './section.service.js';

@Module({
  imports: [PersistenceModule],
  controllers: [SectionController],
  providers: [SectionService],
  exports: [SectionService],
})
export class SectionModule {}
