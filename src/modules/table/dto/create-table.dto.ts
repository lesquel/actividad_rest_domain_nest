import { IsInt, IsOptional, IsUUID, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTableDto {
  @ApiProperty({
    description: 'Identificador de la sección a la que pertenece la mesa',
    format: 'uuid',
    example: '4bc0ab9a-4a86-4d95-9182-c83b20a0cf7a',
  })
  @IsUUID()
  sectionId!: string;

  @ApiProperty({
    description: 'Número asignado a la mesa dentro de la sección',
    type: Number,
    minimum: 1,
    example: 12,
  })
  @IsInt()
  @Min(1)
  tableNumber!: number;

  @ApiProperty({
    description: 'Capacidad máxima de comensales en la mesa',
    type: Number,
    minimum: 1,
    example: 4,
  })
  @IsInt()
  @Min(1)
  capacity!: number;

  @ApiProperty({
    description: 'Coordenada horizontal de la mesa en el plano',
    type: Number,
    example: 320,
  })
  @IsInt()
  positionX!: number;

  @ApiProperty({
    description: 'Coordenada vertical de la mesa en el plano',
    type: Number,
    example: 180,
  })
  @IsInt()
  positionY!: number;

  @ApiProperty({
    description: 'Ancho de la mesa en el plano',
    type: Number,
    minimum: 1,
    example: 90,
  })
  @IsInt()
  @Min(1)
  width!: number;

  @ApiProperty({
    description: 'Alto de la mesa en el plano',
    type: Number,
    minimum: 1,
    example: 90,
  })
  @IsInt()
  @Min(1)
  height!: number;

  @ApiPropertyOptional({
    description: 'Identificador de la imagen asociada a la mesa',
    format: 'uuid',
    example: '32a8f4eb-0a6d-4e2f-9a0b-467d145a0c7d',
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  imageId?: string;
}
