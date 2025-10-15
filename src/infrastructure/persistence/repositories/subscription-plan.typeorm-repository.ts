import { AppDataSource } from '../../config/typeorm.config.js';
import type { SubscriptionPlan } from '../../../domain/entities/subscription-plan.entity.js';
import type { SubscriptionPlanRepository } from '../../../domain/repositories/subscription-plan.repository.js';
import { SubscriptionPlanMapper } from '../mappers/domain-mapper.js';
import { SubscriptionPlanOrmEntity } from '../entities/subscription-plan.orm-entity.js';
import { TypeOrmBaseRepository } from './base.typeorm-repository.js';

export class TypeOrmSubscriptionPlanRepository
  extends TypeOrmBaseRepository<SubscriptionPlan, SubscriptionPlanOrmEntity>
  implements SubscriptionPlanRepository
{
  protected relations = ['suscripciones'];

  constructor() {
    super(
      AppDataSource.getRepository(SubscriptionPlanOrmEntity),
      (e) => SubscriptionPlanMapper.toDomain(e, { depth: 'basic' }),
      SubscriptionPlanMapper.toOrm,
    );
  }
}
