import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../infrastructure/persistence/persistence.module.js';
import { LayoutObjectController } from './layout-object.controller.js';
import { LayoutObjectService } from './layout-object.service.js';

@Module({
  imports: [PersistenceModule],
  controllers: [LayoutObjectController],
  providers: [LayoutObjectService],
  exports: [LayoutObjectService],
})
export class LayoutObjectModule {}
