import type { Menu } from '../../../domain/entities/menu.entity.js';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MenuResponseDto {
  @ApiProperty({
    description: 'Identificador único del menú',
    format: 'uuid',
    example: '9ffb0c2b-1d01-4465-8aa4-3f52f4df09fb',
  })
  id!: string;

  @ApiProperty({
    description: 'Identificador del restaurante que ofrece el menú',
    format: 'uuid',
    example: '7ef81fa4-0c6f-48aa-9d2a-2a88a12df855',
  })
  restaurantId!: string;

  @ApiProperty({
    description: 'Nombre del menú mostrado a los comensales',
    example: 'Menú degustación de mariscos',
  })
  name!: string;

  @ApiPropertyOptional({
    description: 'Descripción comercial del menú',
    example: 'Incluye entrada, plato fuerte y postre con maridaje sugerido.',
    nullable: true,
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Precio promedio sugerido del menú',
    type: Number,
    nullable: true,
    example: 520,
  })
  price?: number | null;

  @ApiPropertyOptional({
    description: 'URL de la imagen de portada del menú',
    nullable: true,
    example: 'https://cdn.restaurants.example/menus/degustacion.jpg',
  })
  coverImageUrl?: string | null;

  @ApiProperty({
    description: 'Listado de identificadores de los platillos asociados',
    type: [String],
    example: [
      'c47331a3-2d10-493e-9a7f-29433536b54c',
      '8f80de5c-1f1d-4064-9cf5-32a9ad55d5f7',
    ],
  })
  dishIds!: string[];
  static fromDomain(menu: Menu): MenuResponseDto {
    const dto = new MenuResponseDto();
    dto.id = menu.id;
    dto.restaurantId = menu.restaurant.id;
    dto.name = menu.name;
    dto.description = menu.description;
    dto.price = menu.price;
    dto.coverImageUrl = menu.coverImageUrl;
    return dto;
  }
}
