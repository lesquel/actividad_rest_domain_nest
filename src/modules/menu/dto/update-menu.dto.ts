import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMenuDto {
  @ApiPropertyOptional({
    description: 'Identificador del nuevo restaurante propietario',
    format: 'uuid',
    example: 'a36b631a-0dfe-4c96-9c66-f05965e76a7a',
  })
  @IsOptional()
  @IsUUID()
  restaurantId?: string;

  @ApiPropertyOptional({
    description: 'Nombre actualizado del menú',
    maxLength: 150,
    example: 'Menú degustación edición limitada',
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @ApiPropertyOptional({
    description: 'Descripción actualizada del menú',
    maxLength: 500,
    example: 'Incluye maridaje de vinos orgánicos y postres artesanales.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({
    description: 'Precio estimado actualizado',
    type: Number,
    minimum: 0,
    example: 420,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({
    description: 'URL de la nueva imagen de portada',
    maxLength: 255,
    nullable: true,
    example: 'https://cdn.restaurants.example/menus/new-cover.png',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  coverImageUrl?: string;
}
