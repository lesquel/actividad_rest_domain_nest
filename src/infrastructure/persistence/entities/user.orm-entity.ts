import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import type { Relation } from 'typeorm';

import { PaymentOrmEntity } from './payment.orm-entity.js';
import { ReservationOrmEntity } from './reservation.orm-entity.js';
import { ReviewOrmEntity } from './review.orm-entity.js';
import { SubscriptionOrmEntity } from './subscription.orm-entity.js';

@Entity({ name: 'usuario' })
@Unique(['email'])
export class UserOrmEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'usuario_id' })
  id!: string;

  @Column('varchar', { length: 100 })
  email!: string;

  @Column('varchar', { length: 100 })
  nombres!: string;

  @Column('varchar', { length: 15 })
  telefono!: string;

  @OneToMany(
    () => ReservationOrmEntity,
    (reservation: ReservationOrmEntity) => reservation.usuario,
  )
  reservas!: Relation<ReservationOrmEntity[]>;

  @OneToMany(
    () => PaymentOrmEntity,
    (payment: PaymentOrmEntity) => payment.usuario,
  )
  pagos!: Relation<PaymentOrmEntity[]>;

  @OneToMany(
    () => SubscriptionOrmEntity,
    (subscription: SubscriptionOrmEntity) => subscription.usuario,
  )
  suscripciones!: Relation<SubscriptionOrmEntity[]>;

  @OneToMany(() => ReviewOrmEntity, (review: ReviewOrmEntity) => review.usuario)
  resenas!: Relation<ReviewOrmEntity[]>;
}
