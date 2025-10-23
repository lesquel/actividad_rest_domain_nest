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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import { CreateTableDto } from './dto/create-table.dto.js';
import { TableResponseDto } from './dto/table-response.dto.js';
import { UpdateTableDto } from './dto/update-table.dto.js';
import { TableService } from './table.service.js';

@ApiTags('Tables')
@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar mesas',
    description: 'Devuelve las mesas registradas incluyendo su posición en el plano.',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Número de registros a omitir antes de iniciar la página.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Cantidad máxima de mesas a devolver.',
  })
  @ApiOkResponse({ description: 'Mesas recuperadas.', type: TableResponseDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Parámetros de paginación inválidos.' })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<TableResponseDto[]> {
    const tables = await this.tableService.findAll(query);
    return tables.map(TableResponseDto.fromDomain);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Consultar mesa',
    description: 'Obtiene el detalle de una mesa en particular.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la mesa',
    format: 'uuid',
  })
  @ApiOkResponse({ description: 'Mesa encontrada.', type: TableResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró la mesa solicitada.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async findOne(@Param('id') id: string): Promise<TableResponseDto> {
    const table = await this.tableService.findOne(id);
    return TableResponseDto.fromDomain(table);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear mesa',
    description: 'Registra una nueva mesa en una sección específica.',
  })
  @ApiBody({
    type: CreateTableDto,
    description: 'Datos de la mesa a registrar.',
  })
  @ApiCreatedResponse({ description: 'Mesa creada correctamente.', type: TableResponseDto })
  @ApiBadRequestResponse({ description: 'Datos de creación inválidos.' })
  async create(@Body() dto: CreateTableDto): Promise<TableResponseDto> {
    const table = await this.tableService.create(dto);
    return TableResponseDto.fromDomain(table);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar mesa',
    description: 'Modifica los campos permitidos de una mesa existente.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la mesa',
    format: 'uuid',
  })
  @ApiBody({
    type: UpdateTableDto,
    description: 'Campos a actualizar en la mesa.',
  })
  @ApiOkResponse({ description: 'Mesa actualizada.', type: TableResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró la mesa a actualizar.' })
  @ApiBadRequestResponse({ description: 'Datos de actualización inválidos.' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTableDto,
  ): Promise<TableResponseDto> {
    const table = await this.tableService.update(id, dto);
    return TableResponseDto.fromDomain(table);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar mesa',
    description: 'Elimina una mesa del plano del restaurante.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la mesa',
    format: 'uuid',
  })
  @ApiNoContentResponse({ description: 'Mesa eliminada.' })
  @ApiNotFoundResponse({ description: 'No se encontró la mesa indicada.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.tableService.remove(id);
  }
}
