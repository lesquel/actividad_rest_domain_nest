import { AppDataSource } from '../../config/typeorm.config.js';
import type { Dish } from '../../../domain/entities/dish.entity.js';
import type { DishRepository } from '../../../domain/repositories/dish.repository.js';
import { DishMapper } from '../mappers/domain-mapper.js';
import { DishOrmEntity } from '../entities/dish.orm-entity.js';
import { TypeOrmBaseRepository } from './base.typeorm-repository.js';

export class TypeOrmDishRepository
  extends TypeOrmBaseRepository<Dish, DishOrmEntity>
  implements DishRepository
{
  protected relations = ['restaurante', 'menu', 'imagen'];

  constructor() {
    super(
      AppDataSource.getRepository(DishOrmEntity),
      DishMapper.toDomain,
      DishMapper.toOrm,
    );
  }
}
