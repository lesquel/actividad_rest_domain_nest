import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../infrastructure/persistence/persistence.module.js';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';

@Module({
  imports: [PersistenceModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
