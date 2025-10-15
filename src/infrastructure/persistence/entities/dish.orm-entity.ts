import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';

import { ImageOrmEntity } from './image.orm-entity.js';
import { MenuOrmEntity } from './menu.orm-entity.js';
import { RestaurantOrmEntity } from './restaurant.orm-entity.js';

@Entity({ name: 'platillo' })
export class DishOrmEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'platillo_id' })
  id!: string;

  @ManyToOne(
    () => RestaurantOrmEntity,
    (restaurant: RestaurantOrmEntity) => restaurant.platillos,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'restaurante_id' })
  restaurante!: Relation<RestaurantOrmEntity>;

  @ManyToOne(() => MenuOrmEntity, (menu: MenuOrmEntity) => menu.platillos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'menu_id' })
  menu!: Relation<MenuOrmEntity>;

  @Column('varchar', { length: 100 })
  nombre!: string;

  @Column('text', { nullable: true })
  descripcion?: string | null;

  @Column('decimal', { precision: 10, scale: 2 })
  precio!: number;

  @ManyToOne(() => ImageOrmEntity, (image: ImageOrmEntity) => image.platillos, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'imagen_id' })
  imagen?: Relation<ImageOrmEntity> | null;
}
