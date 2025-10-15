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
import type { CreateImageDto } from './dto/create-image.dto.js';
import type { UpdateImageDto } from './dto/update-image.dto.js';
import { ImageResponseDto } from './dto/image-response.dto.js';
import { ImageService } from './image.service.js';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<ImageResponseDto[]> {
    const images = await this.imageService.findAll(query);
    return images.map(ImageResponseDto.fromDomain);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ImageResponseDto> {
    const image = await this.imageService.findOne(id);
    return ImageResponseDto.fromDomain(image);
  }

  @Post()
  async create(@Body() dto: CreateImageDto): Promise<ImageResponseDto> {
    const image = await this.imageService.create(dto);
    return ImageResponseDto.fromDomain(image);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateImageDto,
  ): Promise<ImageResponseDto> {
    const image = await this.imageService.update(id, dto);
    return ImageResponseDto.fromDomain(image);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.imageService.remove(id);
  }
}
