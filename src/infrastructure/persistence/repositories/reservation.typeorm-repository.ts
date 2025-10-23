import { AppDataSource } from '../../config/typeorm.config.js';
import type { Reservation } from '../../../domain/entities/reservation.entity.js';
import type { ReservationRepository } from '../../../domain/repositories/reservation.repository.js';
import { ReservationMapper } from '../mappers/domain-mapper.js';
import { ReservationOrmEntity } from '../entities/reservation.orm-entity.js';
import { TypeOrmBaseRepository } from './base.typeorm-repository.js';

export class TypeOrmReservationRepository
  extends TypeOrmBaseRepository<Reservation, ReservationOrmEntity>
  implements ReservationRepository
{
  protected relations = [
    'usuario',
    'restaurante',
    'mesa',
    'mesa.seccion',
    'mesa.seccion.restaurante',
    'pagos',
  ];

  constructor() {
    super(
      AppDataSource.getRepository(ReservationOrmEntity),
      (e) => ReservationMapper.toDomain(e, { depth: 'basic' }),
      ReservationMapper.toOrm,
    );
  }
}
