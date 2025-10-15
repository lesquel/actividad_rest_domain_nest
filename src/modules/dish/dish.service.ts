import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import type { Image } from '../../domain/entities/image.entity.js';
import type { Menu } from '../../domain/entities/menu.entity.js';
import type { Restaurant } from '../../domain/entities/restaurant.entity.js';
import type { Dish } from '../../domain/entities/dish.entity.js';
import type { DishRepository } from '../../domain/repositories/dish.repository.js';
import type { ImageRepository } from '../../domain/repositories/image.repository.js';
import type { MenuRepository } from '../../domain/repositories/menu.repository.js';
import type { RestaurantRepository } from '../../domain/repositories/restaurant.repository.js';
import {
  DISH_REPOSITORY,
  IMAGE_REPOSITORY,
  MENU_REPOSITORY,
  RESTAURANT_REPOSITORY,
} from '../../application/tokens.js';
import type { CreateDishDto } from './dto/create-dish.dto.js';
import type { UpdateDishDto } from './dto/update-dish.dto.js';

@Injectable()
export class DishService {
  constructor(
    @Inject(DISH_REPOSITORY) private readonly dishRepository: DishRepository,
    @Inject(RESTAURANT_REPOSITORY)
    private readonly restaurantRepository: RestaurantRepository,
    @Inject(MENU_REPOSITORY) private readonly menuRepository: MenuRepository,
    @Inject(IMAGE_REPOSITORY) private readonly imageRepository: ImageRepository,
  ) {}

  async findAll({ offset, limit }: PaginationQueryDto = {}): Promise<Dish[]> {
    return this.dishRepository.findAll({ offset, limit });
  }

  async findOne(id: string): Promise<Dish> {
    const dish = await this.dishRepository.findById(id);
    if (!dish) {
      throw new NotFoundException(`Dish with id ${id} not found.`);
    }
    return dish;
  }

  async create(dto: CreateDishDto): Promise<Dish> {
    const restaurant = await this.resolveRestaurant(dto.restaurantId);
    const menu = await this.resolveMenu(dto.menuId, restaurant);
    const image = await this.resolveImage(dto.imageId);

    const dish: Dish = {
      id: randomUUID(),
      restaurant,
      menu,
      name: dto.name,
      description: dto.description,
      price: dto.price,
      image,
    };

    return this.dishRepository.create(dish);
  }

  async update(id: string, dto: UpdateDishDto): Promise<Dish> {
    const existing = await this.findOne(id);

    const restaurant =
      dto.restaurantId === undefined
        ? existing.restaurant
        : await this.resolveRestaurant(dto.restaurantId);

    let menu: Menu;
    if (dto.menuId) {
      menu = await this.resolveMenu(dto.menuId, restaurant);
    } else if (
      dto.restaurantId &&
      existing.menu.restaurant.id !== restaurant.id
    ) {
      throw new BadRequestException(
        'The provided restaurant does not match the current menu.',
      );
    } else {
      menu = existing.menu;
    }

    const image =
      dto.imageId === undefined
        ? existing.image
        : await this.resolveImage(dto.imageId);

    const updated: Dish = {
      ...existing,
      restaurant,
      menu,
      name: dto.name ?? existing.name,
      description: dto.description ?? existing.description,
      price: dto.price ?? existing.price,
      image,
    };

    return this.dishRepository.update(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.dishRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Dish with id ${id} not found.`);
    }

    await this.dishRepository.delete(id);
  }

  private async resolveRestaurant(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findById(id);
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id ${id} not found.`);
    }
    return restaurant;
  }

  private async resolveMenu(
    menuId: string,
    restaurant: Restaurant,
  ): Promise<Menu> {
    const menu = await this.menuRepository.findById(menuId);
    if (!menu) {
      throw new NotFoundException(`Menu with id ${menuId} not found.`);
    }
    if (menu.restaurant.id !== restaurant.id) {
      throw new BadRequestException(
        'Menu does not belong to the specified restaurant.',
      );
    }
    return menu;
  }

  private async resolveImage(imageId?: string): Promise<Image | null> {
    if (!imageId) {
      return null;
    }

    const image = await this.imageRepository.findById(imageId);
    if (!image) {
      throw new NotFoundException(`Image with id ${imageId} not found.`);
    }
    return image;
  }
}
