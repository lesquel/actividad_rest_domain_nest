import { AppDataSource } from '../../config/typeorm.config.js';
import type { Subscription } from '../../../domain/entities/subscription.entity.js';
import type { SubscriptionRepository } from '../../../domain/repositories/subscription.repository.js';
import { SubscriptionMapper } from '../mappers/domain-mapper.js';
import { SubscriptionOrmEntity } from '../entities/subscription.orm-entity.js';
import { TypeOrmBaseRepository } from './base.typeorm-repository.js';

export class TypeOrmSubscriptionRepository
  extends TypeOrmBaseRepository<Subscription, SubscriptionOrmEntity>
  implements SubscriptionRepository
{
  protected relations = ['usuario', 'restaurante', 'plan'];

  constructor() {
    super(
      AppDataSource.getRepository(SubscriptionOrmEntity),
      (e) => SubscriptionMapper.toDomain(e, { depth: 'basic' }),
      SubscriptionMapper.toOrm,
    );
  }
}
