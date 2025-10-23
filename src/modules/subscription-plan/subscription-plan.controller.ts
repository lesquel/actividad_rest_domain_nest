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
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto.js';
import { SubscriptionPlanResponseDto } from './dto/subscription-plan-response.dto.js';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription-plan.dto.js';
import { SubscriptionPlanService } from './subscription-plan.service.js';

@ApiTags('Subscription Plans')
@Controller('subscription-plans')
export class SubscriptionPlanController {
  constructor(
    private readonly subscriptionPlanService: SubscriptionPlanService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar planes de suscripción',
    description: 'Recupera los planes de suscripción disponibles con paginación opcional.',
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
    description: 'Cantidad máxima de planes a devolver.',
  })
  @ApiOkResponse({ description: 'Planes recuperados.', type: SubscriptionPlanResponseDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Parámetros de paginación inválidos.' })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<SubscriptionPlanResponseDto[]> {
    const plans = await this.subscriptionPlanService.findAll(query);
    return plans.map(SubscriptionPlanResponseDto.fromDomain);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Consultar plan de suscripción',
    description: 'Obtiene el detalle de un plan de suscripción específico.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único del plan',
    format: 'uuid',
  })
  @ApiOkResponse({ description: 'Plan encontrado.', type: SubscriptionPlanResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró el plan solicitado.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async findOne(@Param('id') id: string): Promise<SubscriptionPlanResponseDto> {
    const plan = await this.subscriptionPlanService.findOne(id);
    return SubscriptionPlanResponseDto.fromDomain(plan);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear plan de suscripción',
    description: 'Registra un nuevo plan de suscripción disponible para la plataforma.',
  })
  @ApiBody({
    type: CreateSubscriptionPlanDto,
    description: 'Datos del plan a registrar.',
  })
  @ApiCreatedResponse({ description: 'Plan creado correctamente.', type: SubscriptionPlanResponseDto })
  @ApiBadRequestResponse({ description: 'Datos de creación inválidos.' })
  async create(
    @Body() dto: CreateSubscriptionPlanDto,
  ): Promise<SubscriptionPlanResponseDto> {
    const plan = await this.subscriptionPlanService.create(dto);
    return SubscriptionPlanResponseDto.fromDomain(plan);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar plan de suscripción',
    description: 'Modifica los campos permitidos de un plan previamente creado.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único del plan',
    format: 'uuid',
  })
  @ApiBody({
    type: UpdateSubscriptionPlanDto,
    description: 'Campos a actualizar.',
  })
  @ApiOkResponse({ description: 'Plan actualizado.', type: SubscriptionPlanResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró el plan a actualizar.' })
  @ApiBadRequestResponse({ description: 'Datos de actualización inválidos.' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSubscriptionPlanDto,
  ): Promise<SubscriptionPlanResponseDto> {
    const plan = await this.subscriptionPlanService.update(id, dto);
    return SubscriptionPlanResponseDto.fromDomain(plan);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar plan de suscripción',
    description: 'Elimina permanentemente un plan de suscripción.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único del plan',
    format: 'uuid',
  })
  @ApiNoContentResponse({ description: 'Plan eliminado.' })
  @ApiNotFoundResponse({ description: 'El plan indicado no existe.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.subscriptionPlanService.remove(id);
  }
}
