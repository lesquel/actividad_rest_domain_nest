import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { LayoutObject } from '../../../domain/entities/layout-object.entity.js';

export class LayoutObjectResponseDto {
  @ApiProperty({
    description: 'Identificador único del objeto de layout',
    format: 'uuid',
    example: 'c0c44c0f-f34a-4a56-9c77-3d9acbb8585b',
  })
  id!: string;

  @ApiPropertyOptional({
    description: 'Nombre o etiqueta del objeto en el plano',
    example: 'Mesa 12',
    nullable: true,
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Tipo de objeto (mesa, barra, decoración, etc.)',
    example: 'table',
    nullable: true,
  })
  type?: string;

  @ApiProperty({
    description: 'Posición horizontal del objeto',
    type: Number,
    example: 120,
  })
  positionX!: number;

  @ApiProperty({
    description: 'Posición vertical del objeto',
    type: Number,
    example: 220,
  })
  positionY!: number;

  @ApiProperty({
    description: 'Ancho del objeto en el plano',
    type: Number,
    example: 80,
  })
  width!: number;

  @ApiProperty({
    description: 'Alto del objeto en el plano',
    type: Number,
    example: 80,
  })
  height!: number;

  @ApiPropertyOptional({
    description: 'Identificador de la imagen asociada',
    format: 'uuid',
    nullable: true,
    example: 'c30be437-9d1a-4c7e-82e9-f9c7fd54eef8',
  })
  imageId?: string | null;

  @ApiPropertyOptional({
    description: 'URL de la imagen asociada',
    nullable: true,
    example: 'https://cdn.restaurants.example/layout-elements/mesa-12.png',
  })
  imageUrl?: string | null;

  @ApiProperty({
    description: 'Identificadores de secciones vinculadas al objeto',
    type: [String],
    example: ['08c7032b-cc9a-4fb7-8c75-0a3b9e2ff4ba'],
  })
  sectionIds!: string[];

  static fromDomain(object: LayoutObject): LayoutObjectResponseDto {
    const dto = new LayoutObjectResponseDto();
    dto.id = object.id;
    dto.name = object.name;
    dto.type = object.type;
    dto.positionX = object.positionX;
    dto.positionY = object.positionY;
    dto.width = object.width;
    dto.height = object.height;
    dto.imageId = object.image?.id ?? null;
    dto.imageUrl = object.image?.url ?? null;
    dto.sectionIds = object.sections?.map((section) => section.id) ?? [];
    return dto;
  }
}
