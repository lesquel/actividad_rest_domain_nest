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
import { CreateReservationDto } from './dto/create-reservation.dto.js';
import { ReservationResponseDto } from './dto/reservation-response.dto.js';
import { UpdateReservationDto } from './dto/update-reservation.dto.js';
import { ReservationService } from './reservation.service.js';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar reservaciones',
    description: 'Recupera las reservaciones registradas, con soporte de paginación.',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Cantidad de elementos a omitir en la paginación.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Cantidad máxima de reservaciones a devolver.',
  })
  @ApiOkResponse({ description: 'Reservaciones recuperadas.', type: ReservationResponseDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Parámetros de consulta inválidos.' })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<ReservationResponseDto[]> {
    const reservations = await this.reservationService.findAll(query);
    return reservations.map(ReservationResponseDto.fromDomain);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Consultar reservación',
    description: 'Obtiene el detalle de una reservación mediante su identificador.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la reservación',
    format: 'uuid',
  })
  @ApiOkResponse({ description: 'Reservación encontrada.', type: ReservationResponseDto })
  @ApiNotFoundResponse({ description: 'La reservación solicitada no existe.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async findOne(@Param('id') id: string): Promise<ReservationResponseDto> {
    const reservation = await this.reservationService.findOne(id);
    return ReservationResponseDto.fromDomain(reservation);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear reservación',
    description: 'Registra una nueva reservación para un usuario y una mesa específicos.',
  })
  @ApiBody({
    type: CreateReservationDto,
    description: 'Datos necesarios para crear la reservación.',
  })
  @ApiCreatedResponse({ description: 'Reservación creada exitosamente.', type: ReservationResponseDto })
  @ApiBadRequestResponse({ description: 'Los datos proporcionados son inválidos.' })
  async create(
    @Body() dto: CreateReservationDto,
  ): Promise<ReservationResponseDto> {
    const reservation = await this.reservationService.create(dto);
    return ReservationResponseDto.fromDomain(reservation);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar reservación',
    description: 'Actualiza los datos de una reservación existente.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la reservación',
    format: 'uuid',
  })
  @ApiBody({
    type: UpdateReservationDto,
    description: 'Campos a modificar en la reservación.',
  })
  @ApiOkResponse({ description: 'Reservación actualizada.', type: ReservationResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró la reservación a actualizar.' })
  @ApiBadRequestResponse({ description: 'Datos de actualización inválidos.' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateReservationDto,
  ): Promise<ReservationResponseDto> {
    const reservation = await this.reservationService.update(id, dto);
    return ReservationResponseDto.fromDomain(reservation);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar reservación',
    description: 'Elimina definitivamente una reservación.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la reservación',
    format: 'uuid',
  })
  @ApiNoContentResponse({ description: 'Reservación eliminada correctamente.' })
  @ApiNotFoundResponse({ description: 'La reservación indicada no existe.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.reservationService.remove(id);
  }
}
