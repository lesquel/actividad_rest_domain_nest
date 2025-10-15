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
import type { CreateSectionDto } from './dto/create-section.dto.js';
import type { UpdateSectionDto } from './dto/update-section.dto.js';
import { SectionResponseDto } from './dto/section-response.dto.js';
import { SectionService } from './section.service.js';

@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<SectionResponseDto[]> {
    const sections = await this.sectionService.findAll(query);
    return sections.map(SectionResponseDto.fromDomain);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SectionResponseDto> {
    const section = await this.sectionService.findOne(id);
    return SectionResponseDto.fromDomain(section);
  }

  @Post()
  async create(@Body() dto: CreateSectionDto): Promise<SectionResponseDto> {
    const section = await this.sectionService.create(dto);
    return SectionResponseDto.fromDomain(section);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSectionDto,
  ): Promise<SectionResponseDto> {
    const section = await this.sectionService.update(id, dto);
    return SectionResponseDto.fromDomain(section);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.sectionService.remove(id);
  }
}
