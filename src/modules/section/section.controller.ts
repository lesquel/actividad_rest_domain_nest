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
import { CreateSectionDto } from './dto/create-section.dto.js';
import { SectionResponseDto } from './dto/section-response.dto.js';
import { UpdateSectionDto } from './dto/update-section.dto.js';
import { SectionService } from './section.service.js';

@ApiTags('Sections')
@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar secciones',
    description: 'Devuelve las secciones registradas para los restaurantes con paginación opcional.',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Registros a omitir al iniciar la página.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Cantidad máxima de secciones a devolver en la página.',
  })
  @ApiOkResponse({ description: 'Secciones recuperadas.', type: SectionResponseDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Parámetros de consulta inválidos.' })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<SectionResponseDto[]> {
    const sections = await this.sectionService.findAll(query);
    return sections.map(SectionResponseDto.fromDomain);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Consultar sección',
    description: 'Recupera el detalle de una sección por su identificador.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la sección',
    format: 'uuid',
  })
  @ApiOkResponse({ description: 'Sección encontrada.', type: SectionResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró la sección solicitada.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async findOne(@Param('id') id: string): Promise<SectionResponseDto> {
    const section = await this.sectionService.findOne(id);
    return SectionResponseDto.fromDomain(section);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear sección',
    description: 'Registra una nueva sección dentro de un restaurante.',
  })
  @ApiBody({
    type: CreateSectionDto,
    description: 'Datos de la sección a crear.',
  })
  @ApiCreatedResponse({ description: 'Sección creada correctamente.', type: SectionResponseDto })
  @ApiBadRequestResponse({ description: 'Datos de creación inválidos.' })
  async create(@Body() dto: CreateSectionDto): Promise<SectionResponseDto> {
    const section = await this.sectionService.create(dto);
    return SectionResponseDto.fromDomain(section);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar sección',
    description: 'Modifica los campos permitidos de una sección existente.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la sección',
    format: 'uuid',
  })
  @ApiBody({
    type: UpdateSectionDto,
    description: 'Campos que se desean actualizar en la sección.',
  })
  @ApiOkResponse({ description: 'Sección actualizada.', type: SectionResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró la sección solicitada.' })
  @ApiBadRequestResponse({ description: 'Datos de actualización inválidos.' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSectionDto,
  ): Promise<SectionResponseDto> {
    const section = await this.sectionService.update(id, dto);
    return SectionResponseDto.fromDomain(section);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar sección',
    description: 'Elimina una sección del restaurante.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la sección',
    format: 'uuid',
  })
  @ApiNoContentResponse({ description: 'Sección eliminada.' })
  @ApiNotFoundResponse({ description: 'La sección indicada no existe.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.sectionService.remove(id);
  }
}
