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
import { RestaurantOrmEntity } from './restaurant.orm-entity.js';

@Entity({ name: 'menu' })
export class MenuOrmEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'menu_id' })
  id!: string;

  @ManyToOne(
    () => RestaurantOrmEntity,
    (restaurant: RestaurantOrmEntity) => restaurant.menus,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'restaurante_id' })
  restaurante!: Relation<RestaurantOrmEntity>;

  @Column('varchar', { length: 100 })
  nombre!: string;

  @Column('text', { nullable: true })
  descripcion?: string | null;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  precio?: number | null;

  @Column('varchar', { name: 'foto_url', length: 255, nullable: true })
  fotoUrl?: string | null;

  @OneToMany(() => DishOrmEntity, (dish: DishOrmEntity) => dish.menu)
  platillos!: Relation<DishOrmEntity[]>;
}
