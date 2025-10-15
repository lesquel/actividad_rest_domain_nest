import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../infrastructure/persistence/persistence.module.js';
import { ImageController } from './image.controller.js';
import { ImageService } from './image.service.js';

@Module({
  imports: [PersistenceModule],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
