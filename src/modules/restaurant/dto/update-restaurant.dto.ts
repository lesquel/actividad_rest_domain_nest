import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRestaurantDto {
  @ApiPropertyOptional({
    description: 'Nombre actualizado del restaurante',
    maxLength: 150,
    example: 'Terraza 360',
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @ApiPropertyOptional({
    description: 'Descripción actualizada del restaurante',
    maxLength: 500,
    example: 'Nueva propuesta de cocina de autor enfocada en productos orgánicos.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({
    description: 'Dirección actualizada',
    maxLength: 255,
    example: 'Calle Independencia 45, Guadalajara, MX',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @ApiPropertyOptional({
    description: 'Horario de operación actualizado',
    maxLength: 120,
    example: 'Martes a domingo de 14:00 a 23:30',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  openingHours?: string;

  @ApiPropertyOptional({
    description: 'Nueva capacidad máxima de comensales',
    type: Number,
    minimum: 1,
    example: 140,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;

  @ApiPropertyOptional({
    description: 'Identificador de la imagen asociada',
    format: 'uuid',
    example: 'b9220f60-30e1-4b82-9e89-30eaacb57910',
  })
  @IsOptional()
  @IsUUID()
  imageId?: string;
}
