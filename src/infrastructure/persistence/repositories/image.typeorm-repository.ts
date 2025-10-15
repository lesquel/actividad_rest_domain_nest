import { AppDataSource } from '../../config/typeorm.config.js';
import type { Image } from '../../../domain/entities/image.entity.js';
import type { ImageRepository } from '../../../domain/repositories/image.repository.js';
import { ImageMapper } from '../mappers/domain-mapper.js';
import { ImageOrmEntity } from '../entities/image.orm-entity.js';
import { TypeOrmBaseRepository } from './base.typeorm-repository.js';

export class TypeOrmImageRepository
  extends TypeOrmBaseRepository<Image, ImageOrmEntity>
  implements ImageRepository
{
  protected relations = ['restaurantes', 'mesas', 'objetos', 'platillos'];

  constructor() {
    super(
      AppDataSource.getRepository(ImageOrmEntity),
      ImageMapper.toDomain,
      ImageMapper.toOrm,
    );
  }
}
