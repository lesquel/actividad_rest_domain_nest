import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../infrastructure/persistence/persistence.module.js';
import { MenuController } from './menu.controller.js';
import { MenuService } from './menu.service.js';

@Module({
  imports: [PersistenceModule],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
