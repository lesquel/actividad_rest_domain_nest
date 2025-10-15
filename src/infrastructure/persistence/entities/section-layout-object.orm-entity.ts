import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';

import { LayoutObjectOrmEntity } from './layout-object.orm-entity.js';
import { SectionOrmEntity } from './section.orm-entity.js';

@Entity({ name: 'seccion_objeto' })
export class SectionLayoutObjectOrmEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'seccion_objeto_id' })
  id!: string;

  @ManyToOne(
    () => SectionOrmEntity,
    (section: SectionOrmEntity) => section.seccionObjetos,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'seccion_id' })
  seccion!: Relation<SectionOrmEntity>;

  @ManyToOne(
    () => LayoutObjectOrmEntity,
    (object: LayoutObjectOrmEntity) => object.seccionObjetos,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'objeto_id' })
  objeto!: Relation<LayoutObjectOrmEntity>;
}
