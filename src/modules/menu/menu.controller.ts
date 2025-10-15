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
import type { CreateMenuDto } from './dto/create-menu.dto.js';
import type { UpdateMenuDto } from './dto/update-menu.dto.js';
import { MenuResponseDto } from './dto/menu-response.dto.js';
import { MenuService } from './menu.service.js';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<MenuResponseDto[]> {
    const menus = await this.menuService.findAll(query);
    return menus.map(MenuResponseDto.fromDomain);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MenuResponseDto> {
    const menu = await this.menuService.findOne(id);
    return MenuResponseDto.fromDomain(menu);
  }

  @Post()
  async create(@Body() dto: CreateMenuDto): Promise<MenuResponseDto> {
    const menu = await this.menuService.create(dto);
    return MenuResponseDto.fromDomain(menu);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMenuDto,
  ): Promise<MenuResponseDto> {
    const menu = await this.menuService.update(id, dto);
    return MenuResponseDto.fromDomain(menu);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.menuService.remove(id);
  }
}
