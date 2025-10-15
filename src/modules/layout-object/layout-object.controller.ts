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
import type { CreateLayoutObjectDto } from './dto/create-layout-object.dto.js';
import type { UpdateLayoutObjectDto } from './dto/update-layout-object.dto.js';
import { LayoutObjectResponseDto } from './dto/layout-object-response.dto.js';
import { LayoutObjectService } from './layout-object.service.js';

@Controller('layout-objects')
export class LayoutObjectController {
  constructor(private readonly layoutObjectService: LayoutObjectService) {}

  @Get()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<LayoutObjectResponseDto[]> {
    const objects = await this.layoutObjectService.findAll(query);
    return objects.map(LayoutObjectResponseDto.fromDomain);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LayoutObjectResponseDto> {
    const object = await this.layoutObjectService.findOne(id);
    return LayoutObjectResponseDto.fromDomain(object);
  }

  @Post()
  async create(
    @Body() dto: CreateLayoutObjectDto,
  ): Promise<LayoutObjectResponseDto> {
    const object = await this.layoutObjectService.create(dto);
    return LayoutObjectResponseDto.fromDomain(object);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateLayoutObjectDto,
  ): Promise<LayoutObjectResponseDto> {
    const object = await this.layoutObjectService.update(id, dto);
    return LayoutObjectResponseDto.fromDomain(object);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.layoutObjectService.remove(id);
  }
}
