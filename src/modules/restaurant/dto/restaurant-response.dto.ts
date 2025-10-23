import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { Restaurant } from '../../../domain/entities/restaurant.entity.js';

export class RestaurantResponseDto {
  @ApiProperty({
    description: 'Identificador único del restaurante',
    format: 'uuid',
    example: '9b8aae3c-6d2d-4c01-b82c-b87bcae40558',
  })
  id!: string;

  @ApiProperty({
    description: 'Nombre comercial del restaurante',
    example: 'La Terraza del Chef',
  })
  name!: string;

  @ApiPropertyOptional({
    description: 'Descripción general del restaurante',
    nullable: true,
    example: 'Experiencia gastronómica de autor con ingredientes de temporada.',
  })
  description?: string;

  @ApiProperty({
    description: 'Dirección física del restaurante',
    example: 'Av. Reforma 123, Ciudad de México, MX',
  })
  address!: string;

  @ApiPropertyOptional({
    description: 'Horario de operación',
    nullable: true,
    example: 'Lunes a sábado de 13:00 a 23:00',
  })
  openingHours?: string;

  @ApiProperty({
    description: 'Capacidad máxima de comensales',
    type: Number,
    example: 120,
  })
  capacity!: number;

  @ApiPropertyOptional({
    description: 'Identificador de la imagen destacada',
    format: 'uuid',
    nullable: true,
    example: 'a3b1e88a-2946-4bfb-8c9d-b727ecbc8615',
  })
  imageId?: string | null;

  @ApiPropertyOptional({
    description: 'URL de la imagen destacada',
    nullable: true,
    example: 'https://cdn.restaurants.example/restaurants/la-terraza.jpg',
  })
  imageUrl?: string | null;

  static fromDomain(restaurant: Restaurant): RestaurantResponseDto {
    const dto = new RestaurantResponseDto();
    dto.id = restaurant.id;
    dto.name = restaurant.name;
    dto.description = restaurant.description;
    dto.address = restaurant.address;
    dto.openingHours = restaurant.openingHours;
    dto.capacity = restaurant.capacity;
    dto.imageId = restaurant.image?.id ?? null;
    dto.imageUrl = restaurant.image?.url ?? null;
    return dto;
  }
}
