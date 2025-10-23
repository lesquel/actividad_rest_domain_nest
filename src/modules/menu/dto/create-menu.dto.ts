import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({
    description: 'Identificador del restaurante propietario del menú',
    format: 'uuid',
    example: 'fb1f6164-0ddc-4cea-8fc0-02e3d632144b',
  })
  @IsUUID()
  restaurantId!: string;

  @ApiProperty({
    description: 'Nombre comercial del menú',
    maxLength: 150,
    example: 'Menú de temporada otoño-invierno',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name!: string;

  @ApiPropertyOptional({
    description: 'Descripción o mensaje principal del menú',
    maxLength: 500,
    example: 'Selección de platillos inspirados en productos locales de temporada.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({
    description: 'Precio promedio del menú para referencias rápidas',
    minimum: 0,
    type: Number,
    example: 399.99,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({
    description: 'URL de la imagen de portada del menú',
    maxLength: 255,
    nullable: true,
    example: 'https://cdn.restaurants.example/menus/season-cover.jpg',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  coverImageUrl?: string;
}
