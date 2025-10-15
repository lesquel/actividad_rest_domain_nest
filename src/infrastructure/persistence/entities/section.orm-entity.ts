import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';

import { RestaurantOrmEntity } from './restaurant.orm-entity.js';
import { SectionLayoutObjectOrmEntity } from './section-layout-object.orm-entity.js';
import { TableOrmEntity } from './table.orm-entity.js';

@Entity({ name: 'seccion' })
export class SectionOrmEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'seccion_id' })
  id!: string;

  @Column('varchar', { length: 80 })
  nombre!: string;

  @Column('text', { nullable: true })
  descripcion?: string | null;

  @ManyToOne(
    () => RestaurantOrmEntity,
    (restaurant: RestaurantOrmEntity) => restaurant.secciones,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'restaurante_id' })
  restaurante!: Relation<RestaurantOrmEntity>;

  @OneToMany(() => TableOrmEntity, (table: TableOrmEntity) => table.seccion)
  mesas!: Relation<TableOrmEntity[]>;

  @OneToMany(
    () => SectionLayoutObjectOrmEntity,
    (sectionObject: SectionLayoutObjectOrmEntity) => sectionObject.seccion,
    { cascade: true },
  )
  seccionObjetos!: Relation<SectionLayoutObjectOrmEntity[]>;
}
