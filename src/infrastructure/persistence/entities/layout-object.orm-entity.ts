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
import { SectionLayoutObjectOrmEntity } from './section-layout-object.orm-entity.js';

@Entity({ name: 'objeto' })
export class LayoutObjectOrmEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'objeto_id' })
  id!: string;

  @Column('varchar', { length: 100, nullable: true })
  nombre?: string | null;

  @Column('varchar', { length: 50, nullable: true })
  tipo?: string | null;

  @Column('int', { name: 'pos_x' })
  posX!: number;

  @Column('int', { name: 'pos_y' })
  posY!: number;

  @Column('int', { name: 'ancho' })
  ancho!: number;

  @Column('int', { name: 'alto' })
  alto!: number;

  @ManyToOne(() => ImageOrmEntity, (image: ImageOrmEntity) => image.objetos, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'imagen_id' })
  imagen?: Relation<ImageOrmEntity> | null;

  @OneToMany(
    () => SectionLayoutObjectOrmEntity,
    (sectionObject: SectionLayoutObjectOrmEntity) => sectionObject.objeto,
  )
  seccionObjetos!: Relation<SectionLayoutObjectOrmEntity[]>;
}
