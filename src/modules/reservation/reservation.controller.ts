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
import type { CreateReservationDto } from './dto/create-reservation.dto.js';
import type { UpdateReservationDto } from './dto/update-reservation.dto.js';
import { ReservationResponseDto } from './dto/reservation-response.dto.js';
import { ReservationService } from './reservation.service.js';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<ReservationResponseDto[]> {
    const reservations = await this.reservationService.findAll(query);
    return reservations.map(ReservationResponseDto.fromDomain);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReservationResponseDto> {
    const reservation = await this.reservationService.findOne(id);
    return ReservationResponseDto.fromDomain(reservation);
  }

  @Post()
  async create(
    @Body() dto: CreateReservationDto,
  ): Promise<ReservationResponseDto> {
    const reservation = await this.reservationService.create(dto);
    return ReservationResponseDto.fromDomain(reservation);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateReservationDto,
  ): Promise<ReservationResponseDto> {
    const reservation = await this.reservationService.update(id, dto);
    return ReservationResponseDto.fromDomain(reservation);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.reservationService.remove(id);
  }
}
