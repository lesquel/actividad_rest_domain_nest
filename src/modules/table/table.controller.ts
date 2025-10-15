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
import type { CreateTableDto } from './dto/create-table.dto.js';
import type { UpdateTableDto } from './dto/update-table.dto.js';
import { TableResponseDto } from './dto/table-response.dto.js';
import { TableService } from './table.service.js';

@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<TableResponseDto[]> {
    const tables = await this.tableService.findAll(query);
    return tables.map(TableResponseDto.fromDomain);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TableResponseDto> {
    const table = await this.tableService.findOne(id);
    return TableResponseDto.fromDomain(table);
  }

  @Post()
  async create(@Body() dto: CreateTableDto): Promise<TableResponseDto> {
    const table = await this.tableService.create(dto);
    return TableResponseDto.fromDomain(table);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTableDto,
  ): Promise<TableResponseDto> {
    const table = await this.tableService.update(id, dto);
    return TableResponseDto.fromDomain(table);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.tableService.remove(id);
  }
}
