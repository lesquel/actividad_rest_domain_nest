import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';

import { PaymentOrmEntity } from './payment.orm-entity.js';
import { RestaurantOrmEntity } from './restaurant.orm-entity.js';
import { TableOrmEntity } from './table.orm-entity.js';
import { UserOrmEntity } from './user.orm-entity.js';

@Entity({ name: 'reserva' })
export class ReservationOrmEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'reserva_id' })
  id!: string;

  @ManyToOne(() => UserOrmEntity, (user: UserOrmEntity) => user.reservas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Relation<UserOrmEntity>;

  @ManyToOne(
    () => RestaurantOrmEntity,
    (restaurant: RestaurantOrmEntity) => restaurant.reservas,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'restaurante_id' })
  restaurante!: Relation<RestaurantOrmEntity>;

  @ManyToOne(
    () => TableOrmEntity,
    (table: TableOrmEntity) => table.reservaciones,
    {
      onDelete: 'RESTRICT',
    },
  )
  @JoinColumn({ name: 'mesa_id' })
  mesa!: Relation<TableOrmEntity>;

  @Column('date', { name: 'fecha_reserva' })
  fechaReserva!: string;

  @Column('time')
  hora!: string;

  @Column('int', { name: 'cantidad_personas' })
  cantidadPersonas!: number;

  @Column('varchar', { length: 30 })
  estado!: string;

  @Column('varchar', { length: 250, nullable: true })
  notas?: string | null;

  @OneToMany(
    () => PaymentOrmEntity,
    (payment: PaymentOrmEntity) => payment.reserva,
  )
  pagos!: Relation<PaymentOrmEntity[]>;
}
