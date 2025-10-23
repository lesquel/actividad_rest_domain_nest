import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { DiningTable } from '../../../domain/entities/table.entity.js';

export class TableResponseDto {
  @ApiProperty({
    description: 'Identificador único de la mesa',
    format: 'uuid',
    example: 'f83e4e44-7f87-4f1a-abc2-8ed2c9bcf33b',
  })
  id!: string;

  @ApiProperty({
    description: 'Identificador de la sección a la que pertenece la mesa',
    format: 'uuid',
    example: '4bc0ab9a-4a86-4d95-9182-c83b20a0cf7a',
  })
  sectionId!: string;

  @ApiProperty({
    description: 'Identificador del restaurante de la mesa',
    format: 'uuid',
    example: 'c30fa171-1a1f-4a66-98f4-8f5d0f3f3f38',
  })
  restaurantId!: string;

  @ApiProperty({
    description: 'Número asignado a la mesa dentro de la sección',
    type: Number,
    example: 12,
  })
  tableNumber!: number;

  @ApiProperty({
    description: 'Capacidad de comensales que soporta la mesa',
    type: Number,
    example: 4,
  })
  capacity!: number;

  @ApiProperty({
    description: 'Coordenada horizontal de la mesa',
    type: Number,
    example: 320,
  })
  positionX!: number;

  @ApiProperty({
    description: 'Coordenada vertical de la mesa',
    type: Number,
    example: 180,
  })
  positionY!: number;

  @ApiProperty({
    description: 'Ancho de la mesa en el plano',
    type: Number,
    example: 90,
  })
  width!: number;

  @ApiProperty({
    description: 'Alto de la mesa en el plano',
    type: Number,
    example: 90,
  })
  height!: number;

  @ApiPropertyOptional({
    description: 'Identificador de la imagen asociada',
    format: 'uuid',
    nullable: true,
    example: '32a8f4eb-0a6d-4e2f-9a0b-467d145a0c7d',
  })
  imageId?: string | null;

  @ApiPropertyOptional({
    description: 'URL de la imagen asociada',
    nullable: true,
    example: 'https://cdn.restaurants.example/tables/mesa-12.png',
  })
  imageUrl?: string | null;

  static fromDomain(table: DiningTable): TableResponseDto {
    const dto = new TableResponseDto();
    dto.id = table.id;
    dto.sectionId = table.section.id;
    dto.restaurantId = table.section.restaurant.id;
    dto.tableNumber = table.tableNumber;
    dto.capacity = table.capacity;
    dto.positionX = table.positionX;
    dto.positionY = table.positionY;
    dto.width = table.width;
    dto.height = table.height;
    dto.imageId = table.image?.id ?? null;
    dto.imageUrl = table.image?.url ?? null;
    return dto;
  }
}
