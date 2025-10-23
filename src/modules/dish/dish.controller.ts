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
import { CreateDishDto } from './dto/create-dish.dto.js';
import { DishResponseDto } from './dto/dish-response.dto.js';
import { UpdateDishDto } from './dto/update-dish.dto.js';
import { DishService } from './dish.service.js';

@ApiTags('Dishes')
@Controller('dishes')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar platillos',
    description:
      'Devuelve un listado paginado de platillos disponibles filtrando por desplazamiento y límite opcional.',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Cantidad de registros a omitir antes de iniciar la página.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Cantidad máxima de registros a recuperar en la página.',
  })
  @ApiOkResponse({
    description: 'Listado paginado de platillos recuperado exitosamente.',
    type: DishResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Parámetros de paginación inválidos.' })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<DishResponseDto[]> {
    const dishes = await this.dishService.findAll(query);
    return dishes.map(DishResponseDto.fromDomain);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Consultar un platillo',
    description: 'Recupera la información de un platillo mediante su identificador.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único del platillo',
    format: 'uuid',
  })
  @ApiOkResponse({ description: 'Platillo encontrado.', type: DishResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró un platillo con el identificador proporcionado.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async findOne(@Param('id') id: string): Promise<DishResponseDto> {
    const dish = await this.dishService.findOne(id);
    return DishResponseDto.fromDomain(dish);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un platillo',
    description:
      'Registra un nuevo platillo asociado a un restaurante y menú determinados.',
  })
  @ApiBody({
    type: CreateDishDto,
    description: 'Cuerpo de la petición con los datos del platillo a crear.',
  })
  @ApiCreatedResponse({ description: 'Platillo creado exitosamente.', type: DishResponseDto })
  @ApiBadRequestResponse({ description: 'La solicitud contiene datos inválidos o incompletos.' })
  async create(@Body() dto: CreateDishDto): Promise<DishResponseDto> {
    const dish = await this.dishService.create(dto);
    return DishResponseDto.fromDomain(dish);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar un platillo',
    description: 'Modifica los campos permitidos de un platillo existente.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único del platillo',
    format: 'uuid',
  })
  @ApiBody({
    type: UpdateDishDto,
    description: 'Cuerpo de la petición con los datos a actualizar.',
  })
  @ApiOkResponse({ description: 'Platillo actualizado correctamente.', type: DishResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró el platillo a actualizar.' })
  @ApiBadRequestResponse({ description: 'Datos de actualización inválidos.' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateDishDto,
  ): Promise<DishResponseDto> {
    const dish = await this.dishService.update(id, dto);
    return DishResponseDto.fromDomain(dish);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar un platillo',
    description:
      'Elimina de forma permanente un platillo, incluyendo sus asociaciones con menús o imágenes.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único del platillo',
    format: 'uuid',
  })
  @ApiNoContentResponse({ description: 'Platillo eliminado correctamente.' })
  @ApiNotFoundResponse({ description: 'No se encontró el platillo a eliminar.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.dishService.remove(id);
  }
}
