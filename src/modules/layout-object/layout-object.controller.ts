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
import { CreateLayoutObjectDto } from './dto/create-layout-object.dto.js';
import { LayoutObjectResponseDto } from './dto/layout-object-response.dto.js';
import { UpdateLayoutObjectDto } from './dto/update-layout-object.dto.js';
import { LayoutObjectService } from './layout-object.service.js';

@ApiTags('Layout Objects')
@Controller('layout-objects')
export class LayoutObjectController {
  constructor(private readonly layoutObjectService: LayoutObjectService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar objetos de layout',
    description:
      'Devuelve los elementos diseñados en el plano del restaurante, permitiendo paginación.',
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
    description: 'Número máximo de registros dentro de la página actual.',
  })
  @ApiOkResponse({
    description: 'Objetos de layout recuperados exitosamente.',
    type: LayoutObjectResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Parámetros de consulta inválidos.' })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<LayoutObjectResponseDto[]> {
    const objects = await this.layoutObjectService.findAll(query);
    return objects.map(LayoutObjectResponseDto.fromDomain);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Consultar objeto de layout',
    description: 'Obtiene el detalle completo de un objeto de layout por su identificador.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único del objeto de layout',
    format: 'uuid',
  })
  @ApiOkResponse({ description: 'Objeto de layout encontrado.', type: LayoutObjectResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró el objeto de layout solicitado.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async findOne(@Param('id') id: string): Promise<LayoutObjectResponseDto> {
    const object = await this.layoutObjectService.findOne(id);
    return LayoutObjectResponseDto.fromDomain(object);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear objeto de layout',
    description: 'Registra un nuevo elemento dentro del plano del restaurante.',
  })
  @ApiBody({
    type: CreateLayoutObjectDto,
    description: 'Carga útil con los datos del objeto a registrar.',
  })
  @ApiCreatedResponse({ description: 'Objeto de layout creado correctamente.', type: LayoutObjectResponseDto })
  @ApiBadRequestResponse({ description: 'Datos de creación inválidos.' })
  async create(
    @Body() dto: CreateLayoutObjectDto,
  ): Promise<LayoutObjectResponseDto> {
    const object = await this.layoutObjectService.create(dto);
    return LayoutObjectResponseDto.fromDomain(object);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar objeto de layout',
    description: 'Modifica los valores permitidos de un objeto representado en el plano.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único del objeto de layout',
    format: 'uuid',
  })
  @ApiBody({
    type: UpdateLayoutObjectDto,
    description: 'Carga útil con los campos a actualizar.',
  })
  @ApiOkResponse({ description: 'Objeto de layout actualizado.', type: LayoutObjectResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró el objeto de layout para actualizar.' })
  @ApiBadRequestResponse({ description: 'Datos de actualización inválidos.' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateLayoutObjectDto,
  ): Promise<LayoutObjectResponseDto> {
    const object = await this.layoutObjectService.update(id, dto);
    return LayoutObjectResponseDto.fromDomain(object);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar objeto de layout',
    description: 'Elimina de forma permanente un elemento del plano.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único del objeto de layout',
    format: 'uuid',
  })
  @ApiNoContentResponse({ description: 'Objeto de layout eliminado.' })
  @ApiNotFoundResponse({ description: 'El objeto de layout indicado no existe.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.layoutObjectService.remove(id);
  }
}
