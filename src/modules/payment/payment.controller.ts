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
import type { CreatePaymentDto } from './dto/create-payment.dto.js';
import type { UpdatePaymentDto } from './dto/update-payment.dto.js';
import { PaymentResponseDto } from './dto/payment-response.dto.js';
import { PaymentService } from './payment.service.js';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<PaymentResponseDto[]> {
    const payments = await this.paymentService.findAll(query);
    return payments.map(PaymentResponseDto.fromDomain);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PaymentResponseDto> {
    const payment = await this.paymentService.findOne(id);
    return PaymentResponseDto.fromDomain(payment);
  }

  @Post()
  async create(@Body() dto: CreatePaymentDto): Promise<PaymentResponseDto> {
    const payment = await this.paymentService.create(dto);
    return PaymentResponseDto.fromDomain(payment);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePaymentDto,
  ): Promise<PaymentResponseDto> {
    const payment = await this.paymentService.update(id, dto);
    return PaymentResponseDto.fromDomain(payment);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.paymentService.remove(id);
  }
}
