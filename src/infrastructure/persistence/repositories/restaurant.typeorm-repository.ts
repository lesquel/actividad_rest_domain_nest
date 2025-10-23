import { AppDataSource } from '../../config/typeorm.config.js';
import type { Restaurant } from '../../../domain/entities/restaurant.entity.js';
import type { RestaurantRepository } from '../../../domain/repositories/restaurant.repository.js';
import { RestaurantMapper } from '../mappers/domain-mapper.js';
import { RestaurantOrmEntity } from '../entities/restaurant.orm-entity.js';
import { TypeOrmBaseRepository } from './base.typeorm-repository.js';

export class TypeOrmRestaurantRepository
  extends TypeOrmBaseRepository<Restaurant, RestaurantOrmEntity>
  implements RestaurantRepository
{
  protected relations = [
    'imagen',
    'secciones',
    'reservas',
    'reservas.restaurante',
    'reservas.usuario',
    'reservas.mesa',
    'reservas.mesa.seccion',
    'reservas.mesa.seccion.restaurante',
    'resenas',
    'suscripciones',
    'menus',
  ];

  constructor() {
    super(
      AppDataSource.getRepository(RestaurantOrmEntity),
      (e) => RestaurantMapper.toDomain(e, { depth: 'basic' }),
      RestaurantMapper.toOrm,
    );
  }
}
