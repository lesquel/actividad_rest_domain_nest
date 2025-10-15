import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../infrastructure/persistence/persistence.module.js';
import { TableController } from './table.controller.js';
import { TableService } from './table.service.js';

@Module({
  imports: [PersistenceModule],
  controllers: [TableController],
  providers: [TableService],
  exports: [TableService],
})
export class TableModule {}
