import { AppDataSource } from '../../config/typeorm.config.js';
import type { Menu } from '../../../domain/entities/menu.entity.js';
import type { MenuRepository } from '../../../domain/repositories/menu.repository.js';
import { MenuMapper } from '../mappers/domain-mapper.js';
import { MenuOrmEntity } from '../entities/menu.orm-entity.js';
import { TypeOrmBaseRepository } from './base.typeorm-repository.js';

export class TypeOrmMenuRepository
  extends TypeOrmBaseRepository<Menu, MenuOrmEntity>
  implements MenuRepository
{
  protected relations = ['restaurante', 'platillos'];

  constructor() {
    super(
      AppDataSource.getRepository(MenuOrmEntity),
      (e) => MenuMapper.toDomain(e, { depth: 'basic' }),
      MenuMapper.toOrm,
    );
  }
}
