import { AppDataSource } from '../../config/typeorm.config.js';
import type { Review } from '../../../domain/entities/review.entity.js';
import type { ReviewRepository } from '../../../domain/repositories/review.repository.js';
import { ReviewMapper } from '../mappers/domain-mapper.js';
import { ReviewOrmEntity } from '../entities/review.orm-entity.js';
import { TypeOrmBaseRepository } from './base.typeorm-repository.js';

export class TypeOrmReviewRepository
  extends TypeOrmBaseRepository<Review, ReviewOrmEntity>
  implements ReviewRepository
{
  protected relations = [
    'usuario',
    'restaurante',
    'restaurante.secciones',
    'restaurante.reservas',
    'restaurante.reservas.usuario',
    'restaurante.reservas.mesa',
    'restaurante.reservas.mesa.seccion',
    'restaurante.reservas.mesa.seccion.restaurante',
    'restaurante.resenas',
  ];

  constructor() {
    super(
      AppDataSource.getRepository(ReviewOrmEntity),
      ReviewMapper.toDomain,
      ReviewMapper.toOrm,
    );
  }
}
