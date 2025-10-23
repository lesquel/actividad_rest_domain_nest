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
import { CreateSubscriptionDto } from './dto/create-subscription.dto.js';
import { SubscriptionResponseDto } from './dto/subscription-response.dto.js';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto.js';
import { SubscriptionService } from './subscription.service.js';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar suscripciones',
    description: 'Obtiene las suscripciones activas o históricas con paginación opcional.',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Número de suscripciones a omitir antes de iniciar la página.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Cantidad máxima de suscripciones a devolver en la página.',
  })
  @ApiOkResponse({ description: 'Suscripciones recuperadas.', type: SubscriptionResponseDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Parámetros de consulta inválidos.' })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<SubscriptionResponseDto[]> {
    const subscriptions = await this.subscriptionService.findAll(query);
    return subscriptions.map(SubscriptionResponseDto.fromDomain);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Consultar suscripción',
    description: 'Devuelve el detalle de una suscripción por su identificador.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la suscripción',
    format: 'uuid',
  })
  @ApiOkResponse({ description: 'Suscripción encontrada.', type: SubscriptionResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró la suscripción solicitada.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async findOne(@Param('id') id: string): Promise<SubscriptionResponseDto> {
    const subscription = await this.subscriptionService.findOne(id);
    return SubscriptionResponseDto.fromDomain(subscription);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear suscripción',
    description: 'Registra una nueva suscripción para un usuario y restaurante.',
  })
  @ApiBody({
    type: CreateSubscriptionDto,
    description: 'Datos necesarios para crear la suscripción.',
  })
  @ApiCreatedResponse({ description: 'Suscripción creada correctamente.', type: SubscriptionResponseDto })
  @ApiBadRequestResponse({ description: 'Datos de creación inválidos.' })
  async create(
    @Body() dto: CreateSubscriptionDto,
  ): Promise<SubscriptionResponseDto> {
    const subscription = await this.subscriptionService.create(dto);
    return SubscriptionResponseDto.fromDomain(subscription);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar suscripción',
    description: 'Modifica los campos permitidos de una suscripción existente.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la suscripción',
    format: 'uuid',
  })
  @ApiBody({
    type: UpdateSubscriptionDto,
    description: 'Datos a modificar en la suscripción.',
  })
  @ApiOkResponse({ description: 'Suscripción actualizada.', type: SubscriptionResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró la suscripción a actualizar.' })
  @ApiBadRequestResponse({ description: 'Datos de actualización inválidos.' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSubscriptionDto,
  ): Promise<SubscriptionResponseDto> {
    const subscription = await this.subscriptionService.update(id, dto);
    return SubscriptionResponseDto.fromDomain(subscription);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar suscripción',
    description: 'Elimina permanentemente una suscripción registrada.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la suscripción',
    format: 'uuid',
  })
  @ApiNoContentResponse({ description: 'Suscripción eliminada.' })
  @ApiNotFoundResponse({ description: 'La suscripción indicada no existe.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.subscriptionService.remove(id);
  }
}
