import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';

import { DishOrmEntity } from './dish.orm-entity.js';
import { ImageOrmEntity } from './image.orm-entity.js';
import { MenuOrmEntity } from './menu.orm-entity.js';
import { ReservationOrmEntity } from './reservation.orm-entity.js';
import { ReviewOrmEntity } from './review.orm-entity.js';
import { SectionOrmEntity } from './section.orm-entity.js';
import { SubscriptionOrmEntity } from './subscription.orm-entity.js';

@Entity({ name: 'restaurante' })
export class RestaurantOrmEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'restaurante_id' })
  id!: string;

  @Column('varchar', { length: 100 })
  nombre!: string;

  @Column('text', { nullable: true })
  descripcion?: string | null;

  @Column('varchar', { length: 200 })
  direccion!: string;

  @Column('varchar', { name: 'horario_atencion', length: 100, nullable: true })
  horarioAtencion?: string | null;

  @Column('int', { name: 'capacidad_total' })
  capacidadTotal!: number;

  @ManyToOne(
    () => ImageOrmEntity,
    (image: ImageOrmEntity) => image.restaurantes,
    {
      nullable: true,
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn({ name: 'imagen_id' })
  imagen?: Relation<ImageOrmEntity> | null;

  @OneToMany(
    () => SectionOrmEntity,
    (section: SectionOrmEntity) => section.restaurante,
  )
  secciones!: Relation<SectionOrmEntity[]>;

  @OneToMany(
    () => ReservationOrmEntity,
    (reservation: ReservationOrmEntity) => reservation.restaurante,
  )
  reservas!: Relation<ReservationOrmEntity[]>;

  @OneToMany(
    () => ReviewOrmEntity,
    (review: ReviewOrmEntity) => review.restaurante,
  )
  resenas!: Relation<ReviewOrmEntity[]>;

  @OneToMany(
    () => SubscriptionOrmEntity,
    (subscription: SubscriptionOrmEntity) => subscription.restaurante,
  )
  suscripciones!: Relation<SubscriptionOrmEntity[]>;

  @OneToMany(() => MenuOrmEntity, (menu: MenuOrmEntity) => menu.restaurante)
  menus!: Relation<MenuOrmEntity[]>;

  @OneToMany(() => DishOrmEntity, (dish: DishOrmEntity) => dish.restaurante)
  platillos!: Relation<DishOrmEntity[]>;
}
