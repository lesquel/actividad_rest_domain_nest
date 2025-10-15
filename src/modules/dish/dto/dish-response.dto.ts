import type { Dish } from '../../../domain/entities/dish.entity.js';

export class DishResponseDto {
  id!: string;
  restaurantId!: string;
  menuId!: string;
  name!: string;
  description?: string;
  price!: number;
  imageId?: string | null;
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
