import { IsInt, IsOptional, IsUUID, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTableDto {
  @ApiPropertyOptional({
    description: 'Identificador de la sección a la que se moverá la mesa',
    format: 'uuid',
    example: '4bc0ab9a-4a86-4d95-9182-c83b20a0cf7a',
  })
  @IsOptional()
  @IsUUID()
  sectionId?: string;

  @ApiPropertyOptional({
    description: 'Número de mesa actualizado',
    type: Number,
    minimum: 1,
    example: 15,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  tableNumber?: number;

  @ApiPropertyOptional({
    description: 'Capacidad actualizada de la mesa',
    type: Number,
    minimum: 1,
    example: 6,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;

  @ApiPropertyOptional({
    description: 'Nueva coordenada horizontal',
    type: Number,
    example: 350,
  })
  @IsOptional()
  @IsInt()
  positionX?: number;

  @ApiPropertyOptional({
    description: 'Nueva coordenada vertical',
    type: Number,
    example: 210,
  })
  @IsOptional()
  @IsInt()
  positionY?: number;

  @ApiPropertyOptional({
    description: 'Nuevo ancho del elemento',
    type: Number,
    minimum: 1,
    example: 110,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  width?: number;

  @ApiPropertyOptional({
    description: 'Nueva altura del elemento',
    type: Number,
    minimum: 1,
    example: 110,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  height?: number;

  @ApiPropertyOptional({
    description: 'Identificador de la imagen asociada',
    format: 'uuid',
    example: '32a8f4eb-0a6d-4e2f-9a0b-467d145a0c7d',
  })
  @IsOptional()
  @IsUUID()
  imageId?: string;
}
