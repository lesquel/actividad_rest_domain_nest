import { AppDataSource } from '../../config/typeorm.config.js';
import type { Section } from '../../../domain/entities/section.entity.js';
import type { SectionRepository } from '../../../domain/repositories/section.repository.js';
import { SectionMapper } from '../mappers/domain-mapper.js';
import { SectionOrmEntity } from '../entities/section.orm-entity.js';
import { TypeOrmBaseRepository } from './base.typeorm-repository.js';

export class TypeOrmSectionRepository
  extends TypeOrmBaseRepository<Section, SectionOrmEntity>
  implements SectionRepository
{
  protected relations = [
    'restaurante',
    'mesas',
    'seccionObjetos',
    'seccionObjetos.objeto',
  ];

  constructor() {
    super(
      AppDataSource.getRepository(SectionOrmEntity),
      (e) => SectionMapper.toDomain(e, { depth: 'basic' }),
      SectionMapper.toOrm,
    );
  }
}
