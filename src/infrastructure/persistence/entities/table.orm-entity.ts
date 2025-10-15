import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';

import { ImageOrmEntity } from './image.orm-entity.js';
import { ReservationOrmEntity } from './reservation.orm-entity.js';
import { SectionOrmEntity } from './section.orm-entity.js';

@Entity({ name: 'mesa' })
export class TableOrmEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'mesa_id' })
  id!: string;

  @ManyToOne(
    () => SectionOrmEntity,
    (section: SectionOrmEntity) => section.mesas,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'seccion_id' })
  seccion!: Relation<SectionOrmEntity>;

  @Column('int', { name: 'numero_mesa' })
  numeroMesa!: number;

  @Column('int')
  capacidad!: number;

  @Column('int', { name: 'pos_x' })
  posX!: number;

  @Column('int', { name: 'pos_y' })
  posY!: number;

  @Column('int', { name: 'ancho' })
  ancho!: number;

  @Column('int', { name: 'alto' })
  alto!: number;

  @ManyToOne(() => ImageOrmEntity, (image: ImageOrmEntity) => image.mesas, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'imagen_id' })
  imagen?: Relation<ImageOrmEntity> | null;

  @OneToMany(
    () => ReservationOrmEntity,
    (reservation: ReservationOrmEntity) => reservation.mesa,
  )
  reservaciones!: Relation<ReservationOrmEntity[]>;
}
