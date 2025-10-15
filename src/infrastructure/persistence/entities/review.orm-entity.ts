import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';

import { RestaurantOrmEntity } from './restaurant.orm-entity.js';
import { UserOrmEntity } from './user.orm-entity.js';

@Entity({ name: 'resena' })
export class ReviewOrmEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'resena_id' })
  id!: string;

  @ManyToOne(() => UserOrmEntity, (user: UserOrmEntity) => user.resenas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Relation<UserOrmEntity>;

  @ManyToOne(
    () => RestaurantOrmEntity,
    (restaurant: RestaurantOrmEntity) => restaurant.resenas,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'restaurante_id' })
  restaurante!: Relation<RestaurantOrmEntity>;

  @Column('int')
  rating!: number;

  @Column('text', { nullable: true })
  comentario?: string | null;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'datetime' })
  fechaCreacion!: Date;
}
