import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDishDto {
  @ApiPropertyOptional({
    description: 'Nuevo restaurante propietario del platillo',
    format: 'uuid',
    example: '28a65553-202f-4c8e-89fc-40935d6b7d6b',
  })
  @IsOptional()
  @IsUUID()
  restaurantId?: string;

  @ApiPropertyOptional({
    description: 'Nuevo menú asignado al platillo',
    format: 'uuid',
    example: '5e5a947e-44eb-4f74-a97f-d59d42cbecb3',
  })
  @IsOptional()
  @IsUUID()
  menuId?: string;

  @ApiPropertyOptional({
    description: 'Nombre actualizado del platillo',
    maxLength: 150,
    example: 'Tacos de camarón encacahuatados',
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @ApiPropertyOptional({
    description: 'Descripción actualizada del platillo',
    maxLength: 500,
    example: 'Receta revisada con cacahuate tostado y reducción de naranja.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({
    description: 'Precio actualizado del platillo',
    minimum: 0,
    type: Number,
    example: 159.9,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({
    description: 'Identificador de la imagen a asociar',
    format: 'uuid',
    nullable: true,
    example: 'a67427d9-491d-4b16-9202-0df33bb1a3a0',
  })
  @IsOptional()
  @IsUUID()
  imageId?: string;
}
