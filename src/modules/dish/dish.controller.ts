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
import type { CreateDishDto } from './dto/create-dish.dto.js';
import type { UpdateDishDto } from './dto/update-dish.dto.js';
import { DishResponseDto } from './dto/dish-response.dto.js';
import { DishService } from './dish.service.js';

@Controller('dishes')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<DishResponseDto[]> {
    const dishes = await this.dishService.findAll(query);
    return dishes.map(DishResponseDto.fromDomain);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DishResponseDto> {
    const dish = await this.dishService.findOne(id);
    return DishResponseDto.fromDomain(dish);
  }

  @Post()
  async create(@Body() dto: CreateDishDto): Promise<DishResponseDto> {
    const dish = await this.dishService.create(dto);
    return DishResponseDto.fromDomain(dish);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateDishDto,
  ): Promise<DishResponseDto> {
    const dish = await this.dishService.update(id, dto);
    return DishResponseDto.fromDomain(dish);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.dishService.remove(id);
  }
}
