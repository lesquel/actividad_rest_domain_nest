import type { Menu } from '../../../domain/entities/menu.entity.js';

export class MenuResponseDto {
  id!: string;
  restaurantId!: string;
  name!: string;
  description?: string;
  price?: number;
  coverImageUrl?: string;

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
