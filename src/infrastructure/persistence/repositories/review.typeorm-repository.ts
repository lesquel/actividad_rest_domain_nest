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
  protected relations = ['usuario', 'restaurante'];

  constructor() {
    super(
      AppDataSource.getRepository(ReviewOrmEntity),
      ReviewMapper.toDomain,
      ReviewMapper.toOrm,
    );
  }
}
