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
import { CreateMenuDto } from './dto/create-menu.dto.js';
import { MenuResponseDto } from './dto/menu-response.dto.js';
import { UpdateMenuDto } from './dto/update-menu.dto.js';
import { MenuService } from './menu.service.js';

@ApiTags('Menus')
@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar menús',
    description:
      'Obtiene de forma paginada los menús registrados para los distintos restaurantes.',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Cantidad de registros a omitir antes de devolver resultados.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Número máximo de registros paginados que se devolverán.',
  })
  @ApiOkResponse({ description: 'Listado de menús recuperado.', type: MenuResponseDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Parámetros de consulta inválidos.' })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<MenuResponseDto[]> {
    const menus = await this.menuService.findAll(query);
    return menus.map(MenuResponseDto.fromDomain);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Consultar un menú',
    description: 'Recupera el detalle de un menú específico por su identificador.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único del menú',
    format: 'uuid',
  })
  @ApiOkResponse({ description: 'Menú encontrado.', type: MenuResponseDto })
  @ApiNotFoundResponse({ description: 'No existe un menú con el identificador indicado.' })
  @ApiBadRequestResponse({ description: 'El identificador proporcionado es inválido.' })
  async findOne(@Param('id') id: string): Promise<MenuResponseDto> {
    const menu = await this.menuService.findOne(id);
    return MenuResponseDto.fromDomain(menu);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo menú',
    description: 'Registra un menú dentro de un restaurante, con su información principal.',
  })
  @ApiBody({
    type: CreateMenuDto,
    description: 'Carga útil con los datos del menú a registrar.',
  })
  @ApiCreatedResponse({ description: 'Menú creado correctamente.', type: MenuResponseDto })
  @ApiBadRequestResponse({ description: 'Datos de creación inválidos o faltantes.' })
  async create(@Body() dto: CreateMenuDto): Promise<MenuResponseDto> {
    const menu = await this.menuService.create(dto);
    return MenuResponseDto.fromDomain(menu);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar un menú existente',
    description: 'Actualiza los campos permitidos de un menú previamente registrado.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único del menú',
    format: 'uuid',
  })
  @ApiBody({
    type: UpdateMenuDto,
    description: 'Carga útil con los atributos del menú a modificar.',
  })
  @ApiOkResponse({ description: 'Menú actualizado.', type: MenuResponseDto })
  @ApiNotFoundResponse({ description: 'No se localizó el menú a actualizar.' })
  @ApiBadRequestResponse({ description: 'Datos de actualización inválidos.' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMenuDto,
  ): Promise<MenuResponseDto> {
    const menu = await this.menuService.update(id, dto);
    return MenuResponseDto.fromDomain(menu);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar un menú',
    description: 'Elimina definitivamente un menú y su relación con los platillos asociados.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único del menú',
    format: 'uuid',
  })
  @ApiNoContentResponse({ description: 'Menú eliminado exitosamente.' })
  @ApiNotFoundResponse({ description: 'El menú solicitado no existe.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato incorrecto.' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.menuService.remove(id);
  }
}
