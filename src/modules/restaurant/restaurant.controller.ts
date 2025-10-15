import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import type { CreateRestaurantDto } from './dto/create-restaurant.dto.js';
import type { UpdateRestaurantDto } from './dto/update-restaurant.dto.js';
import { RestaurantResponseDto } from './dto/restaurant-response.dto.js';
import { RestaurantService } from './restaurant.service.js';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<RestaurantResponseDto[]> {
    const restaurants = await this.restaurantService.findAll(query);
    return restaurants.map(RestaurantResponseDto.fromDomain);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RestaurantResponseDto> {
    const restaurant = await this.restaurantService.findOne(id);
    return RestaurantResponseDto.fromDomain(restaurant);
  }

  @Post()
  async create(
    @Body() dto: CreateRestaurantDto,
  ): Promise<RestaurantResponseDto> {
    const restaurant = await this.restaurantService.create(dto);
    return RestaurantResponseDto.fromDomain(restaurant);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRestaurantDto,
  ): Promise<RestaurantResponseDto> {
    const restaurant = await this.restaurantService.update(id, dto);
    return RestaurantResponseDto.fromDomain(restaurant);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.restaurantService.remove(id);
  }
}
