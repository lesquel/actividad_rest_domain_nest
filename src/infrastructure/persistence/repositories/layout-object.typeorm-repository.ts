import { AppDataSource } from '../../config/typeorm.config.js';
import type { LayoutObject } from '../../../domain/entities/layout-object.entity.js';
import type { LayoutObjectRepository } from '../../../domain/repositories/layout-object.repository.js';
import { LayoutObjectMapper } from '../mappers/domain-mapper.js';
import { LayoutObjectOrmEntity } from '../entities/layout-object.orm-entity.js';
import { TypeOrmBaseRepository } from './base.typeorm-repository.js';

export class TypeOrmLayoutObjectRepository
  extends TypeOrmBaseRepository<LayoutObject, LayoutObjectOrmEntity>
  implements LayoutObjectRepository
{
  protected relations = [
    'imagen',
    'seccionObjetos',
    'seccionObjetos.seccion',
    'seccionObjetos.seccion.restaurante',
  ];

  constructor() {
    super(
      AppDataSource.getRepository(LayoutObjectOrmEntity),
      (entity) => LayoutObjectMapper.toDomain(entity, { depth: 'basic' }),
      LayoutObjectMapper.toOrm,
    );
  }
}
