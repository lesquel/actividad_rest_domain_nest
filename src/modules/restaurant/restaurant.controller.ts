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
import { CreateRestaurantDto } from './dto/create-restaurant.dto.js';
import { RestaurantResponseDto } from './dto/restaurant-response.dto.js';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto.js';
import { RestaurantService } from './restaurant.service.js';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar restaurantes',
    description:
      'Recupera de forma paginada los restaurantes registrados en la plataforma.',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Número de registros a omitir antes de comenzar la página.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Cantidad máxima de restaurantes a devolver.',
  })
  @ApiOkResponse({ description: 'Restaurantes recuperados.', type: RestaurantResponseDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Parámetros de paginación inválidos.' })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<RestaurantResponseDto[]> {
    const restaurants = await this.restaurantService.findAll(query);
    return restaurants.map(RestaurantResponseDto.fromDomain);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Consultar restaurante',
    description: 'Obtiene el detalle completo de un restaurante específico.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único del restaurante',
    format: 'uuid',
  })
  @ApiOkResponse({ description: 'Restaurante encontrado.', type: RestaurantResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró el restaurante solicitado.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async findOne(@Param('id') id: string): Promise<RestaurantResponseDto> {
    const restaurant = await this.restaurantService.findOne(id);
    return RestaurantResponseDto.fromDomain(restaurant);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear restaurante',
    description: 'Registra un nuevo restaurante en la plataforma.',
  })
  @ApiBody({
    type: CreateRestaurantDto,
    description: 'Datos necesarios para registrar el restaurante.',
  })
  @ApiCreatedResponse({ description: 'Restaurante creado correctamente.', type: RestaurantResponseDto })
  @ApiBadRequestResponse({ description: 'Datos de creación inválidos o incompletos.' })
  async create(
    @Body() dto: CreateRestaurantDto,
  ): Promise<RestaurantResponseDto> {
    const restaurant = await this.restaurantService.create(dto);
    return RestaurantResponseDto.fromDomain(restaurant);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar restaurante',
    description: 'Modifica los campos permitidos de un restaurante registrado.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único del restaurante',
    format: 'uuid',
  })
  @ApiBody({
    type: UpdateRestaurantDto,
    description: 'Campos que se desean modificar.',
  })
  @ApiOkResponse({ description: 'Restaurante actualizado.', type: RestaurantResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró el restaurante a actualizar.' })
  @ApiBadRequestResponse({ description: 'Datos de actualización inválidos.' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRestaurantDto,
  ): Promise<RestaurantResponseDto> {
    const restaurant = await this.restaurantService.update(id, dto);
    return RestaurantResponseDto.fromDomain(restaurant);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar restaurante',
    description: 'Elimina de forma permanente un restaurante de la plataforma.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único del restaurante',
    format: 'uuid',
  })
  @ApiNoContentResponse({ description: 'Restaurante eliminado exitosamente.' })
  @ApiNotFoundResponse({ description: 'El restaurante indicado no existe.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.restaurantService.remove(id);
  }
}
