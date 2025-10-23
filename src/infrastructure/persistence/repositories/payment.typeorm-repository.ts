import { AppDataSource } from '../../config/typeorm.config.js';
import type { Payment } from '../../../domain/entities/payment.entity.js';
import type { PaymentRepository } from '../../../domain/repositories/payment.repository.js';
import { PaymentMapper } from '../mappers/domain-mapper.js';
import { PaymentOrmEntity } from '../entities/payment.orm-entity.js';
import { TypeOrmBaseRepository } from './base.typeorm-repository.js';

export class TypeOrmPaymentRepository
  extends TypeOrmBaseRepository<Payment, PaymentOrmEntity>
  implements PaymentRepository
{
  protected relations = [
    'reserva',
    'reserva.usuario',
    'reserva.restaurante',
    'reserva.mesa',
    'reserva.mesa.seccion',
    'reserva.mesa.seccion.restaurante',
    'usuario',
  ];

  constructor() {
    super(
      AppDataSource.getRepository(PaymentOrmEntity),
      PaymentMapper.toDomain,
      PaymentMapper.toOrm,
    );
  }
}
