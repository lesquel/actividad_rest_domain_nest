import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { Dish } from '../../../domain/entities/dish.entity.js';

export class DishResponseDto {
  @ApiProperty({
    description: 'Identificador único del platillo',
    format: 'uuid',
    example: 'aab7aa4a-1415-4324-8fb5-c5726f526c6e',
  })
  id!: string;

  @ApiProperty({
    description: 'Identificador del restaurante al que pertenece',
    format: 'uuid',
    example: '0cf715d5-8c21-4a20-8ec1-170206a81d73',
  })
  restaurantId!: string;

  @ApiProperty({
    description: 'Identificador del menú contenedor',
    format: 'uuid',
    example: '6b766096-74fb-41fa-8fdb-98788932aa2a',
  })
  menuId!: string;

  @ApiProperty({
    description: 'Nombre público del platillo',
    example: 'Hamburguesa gourmet de cordero',
  })
  name!: string;

  @ApiPropertyOptional({
    description: 'Descripción detallada del platillo',
    example: 'Carne de cordero orgánico con queso de cabra y mermelada de higos.',
    nullable: true,
  })
  description?: string;

  @ApiProperty({
    description: 'Precio actual del platillo',
    example: 189.99,
    type: Number,
  })
  price!: number;

  @ApiPropertyOptional({
    description: 'Identificador de la imagen asociada',
    format: 'uuid',
    nullable: true,
    example: '22f279db-9479-4fcb-8db6-4f2569a68a57',
  })
  imageId?: string | null;

  @ApiPropertyOptional({
    description: 'URL pública de la imagen asociada',
    nullable: true,
    example: 'https://cdn.restaurants.example/dishes/22f279db.jpg',
  })
  imageUrl?: string | null;

  static fromDomain(dish: Dish): DishResponseDto {
    const dto = new DishResponseDto();
    dto.id = dish.id;
    dto.restaurantId = dish.restaurant.id;
    dto.menuId = dish.menu.id;
    dto.name = dish.name;
    dto.description = dish.description;
    dto.price = dish.price;
    dto.imageId = dish.image?.id ?? null;
    dto.imageUrl = dish.image?.url ?? null;
    return dto;
  }
}
