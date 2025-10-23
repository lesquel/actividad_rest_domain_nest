import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLayoutObjectDto {
  @ApiPropertyOptional({
    description: 'Nuevo nombre o alias del objeto',
    maxLength: 100,
    example: 'Barra norte',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    description: 'Tipo actualizado del objeto en el plano',
    maxLength: 50,
    example: 'bar',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  type?: string;

  @ApiPropertyOptional({
    description: 'Nueva coordenada horizontal del objeto',
    type: Number,
    example: 140,
  })
  @IsOptional()
  @IsInt()
  positionX?: number;

  @ApiPropertyOptional({
    description: 'Nueva coordenada vertical del objeto',
    type: Number,
    example: 260,
  })
  @IsOptional()
  @IsInt()
  positionY?: number;

  @ApiPropertyOptional({
    description: 'Nuevo ancho del objeto',
    type: Number,
    minimum: 1,
    example: 90,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  width?: number;

  @ApiPropertyOptional({
    description: 'Nueva altura del objeto',
    type: Number,
    minimum: 1,
    example: 90,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  height?: number;

  @ApiPropertyOptional({
    description: 'Identificador de la imagen asociada',
    format: 'uuid',
    example: 'cf5e3d00-4b88-4f9f-9ef2-6ac6c5d61bb1',
  })
  @IsOptional()
  @IsUUID()
  imageId?: string;
}
