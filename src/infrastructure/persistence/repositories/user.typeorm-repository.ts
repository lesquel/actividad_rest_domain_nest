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
  protected relations = [
    'reservas',
    'reservas.restaurante',
    'reservas.usuario',
    'reservas.mesa',
    'reservas.mesa.seccion',
    'reservas.mesa.seccion.restaurante',
    'pagos',
    'pagos.reserva',
    'pagos.reserva.restaurante',
    'pagos.reserva.mesa',
    'pagos.reserva.mesa.seccion',
    'pagos.reserva.mesa.seccion.restaurante',
    'suscripciones',
    'suscripciones.restaurante',
    'suscripciones.plan',
    'resenas',
    'resenas.restaurante',
  ];

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
