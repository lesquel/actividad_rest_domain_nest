import { AppDataSource } from '../../config/typeorm.config.js';
import type { User } from '../../../domain/entities/user.entity.js';
import type { UserRepository } from '../../../domain/repositories/user.repository.js';
import { UserMapper } from '../mappers/domain-mapper.js';
import { UserOrmEntity } from '../entities/user.orm-entity.js';
import { TypeOrmBaseRepository } from './base.typeorm-repository.js';

export class TypeOrmUserRepository
  extends TypeOrmBaseRepository<User, UserOrmEntity>
  implements UserRepository
{
  protected relations = ['reservas', 'pagos', 'suscripciones', 'resenas'];

  constructor() {
    super(
      AppDataSource.getRepository(UserOrmEntity),
      (e) => UserMapper.toDomain(e, { depth: 'basic' }),
      UserMapper.toOrm,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repo.findOne({ where: { email } });
    return entity ? UserMapper.toDomain(entity, { depth: 'basic' }) : null;
  }
}
