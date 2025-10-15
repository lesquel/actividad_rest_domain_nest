import type { Restaurant } from '../../../domain/entities/restaurant.entity.js';

export class RestaurantResponseDto {
  id!: string;
  name!: string;
  description?: string;
  address!: string;
  openingHours?: string;
  capacity!: number;
  imageId?: string | null;
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
