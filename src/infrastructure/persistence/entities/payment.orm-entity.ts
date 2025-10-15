import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';

import { ReservationOrmEntity } from './reservation.orm-entity.js';
import { UserOrmEntity } from './user.orm-entity.js';

@Entity({ name: 'pago' })
export class PaymentOrmEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'pago_id' })
  id!: string;

  @ManyToOne(
    () => ReservationOrmEntity,
    (reservation: ReservationOrmEntity) => reservation.pagos,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'reserva_id' })
  reserva!: Relation<ReservationOrmEntity>;

  @ManyToOne(() => UserOrmEntity, (user: UserOrmEntity) => user.pagos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Relation<UserOrmEntity>;

  @Column('decimal', { precision: 10, scale: 2 })
  monto!: number;

  @Column('varchar', { length: 3, default: 'USD' })
  moneda!: string;

  @Column('varchar', { length: 50 })
  metodo!: string;

  @Column('varchar', { length: 30 })
  estado!: string;

  @Column('datetime', { name: 'fecha_pago' })
  fechaPago!: Date;

  @Column('varchar', { length: 120, nullable: true })
  referencia?: string | null;
}
