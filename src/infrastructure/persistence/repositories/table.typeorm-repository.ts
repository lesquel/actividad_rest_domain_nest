import { AppDataSource } from '../../config/typeorm.config.js';
import type { DiningTable } from '../../../domain/entities/table.entity.js';
import type { TableRepository } from '../../../domain/repositories/table.repository.js';
import { TableMapper } from '../mappers/domain-mapper.js';
import { TableOrmEntity } from '../entities/table.orm-entity.js';
import { TypeOrmBaseRepository } from './base.typeorm-repository.js';

export class TypeOrmTableRepository
  extends TypeOrmBaseRepository<DiningTable, TableOrmEntity>
  implements TableRepository
{
  protected relations = [
    'seccion',
    'seccion.restaurante',
    'imagen',
    'reservaciones',
    'reservaciones.usuario',
    'reservaciones.restaurante',
    'reservaciones.mesa',
    'reservaciones.mesa.seccion',
    'reservaciones.mesa.seccion.restaurante',
    'reservaciones.pagos',
  ];

  constructor() {
    super(
      AppDataSource.getRepository(TableOrmEntity),
      (e) => TableMapper.toDomain(e, { depth: 'basic' }),
      TableMapper.toOrm,
    );
  }
}
