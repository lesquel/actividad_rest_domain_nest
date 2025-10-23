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
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { PaymentResponseDto } from './dto/payment-response.dto.js';
import { UpdatePaymentDto } from './dto/update-payment.dto.js';
import { PaymentService } from './payment.service.js';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar pagos',
    description:
      'Devuelve los pagos registrados en la plataforma con soporte de paginación.',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Registros a omitir antes de devolver resultados.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Número máximo de pagos a devolver en la página.',
  })
  @ApiOkResponse({ description: 'Pagos recuperados.', type: PaymentResponseDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Parámetros de paginación inválidos.' })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<PaymentResponseDto[]> {
    const payments = await this.paymentService.findAll(query);
    return payments.map(PaymentResponseDto.fromDomain);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Consultar pago',
    description: 'Recupera el detalle de un pago específico por su identificador.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único del pago',
    format: 'uuid',
  })
  @ApiOkResponse({ description: 'Pago encontrado.', type: PaymentResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró un pago con el identificador proporcionado.' })
  @ApiBadRequestResponse({ description: 'El identificador no cumple con el formato requerido.' })
  async findOne(@Param('id') id: string): Promise<PaymentResponseDto> {
    const payment = await this.paymentService.findOne(id);
    return PaymentResponseDto.fromDomain(payment);
  }

  @Post()
  @ApiOperation({
    summary: 'Registrar pago',
    description: 'Crea un nuevo pago asociado a una reservación y usuario.',
  })
  @ApiBody({
    type: CreatePaymentDto,
    description: 'Datos requeridos para registrar el pago.',
  })
  @ApiCreatedResponse({ description: 'Pago registrado correctamente.', type: PaymentResponseDto })
  @ApiBadRequestResponse({ description: 'Datos de creación inválidos.' })
  async create(@Body() dto: CreatePaymentDto): Promise<PaymentResponseDto> {
    const payment = await this.paymentService.create(dto);
    return PaymentResponseDto.fromDomain(payment);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar pago',
    description: 'Modifica los datos permitidos de un pago existente.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único del pago',
    format: 'uuid',
  })
  @ApiBody({
    type: UpdatePaymentDto,
    description: 'Campos del pago que se desean ajustar.',
  })
  @ApiOkResponse({ description: 'Pago actualizado.', type: PaymentResponseDto })
  @ApiNotFoundResponse({ description: 'No se encontró el pago solicitado.' })
  @ApiBadRequestResponse({ description: 'Datos de actualización inválidos.' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePaymentDto,
  ): Promise<PaymentResponseDto> {
    const payment = await this.paymentService.update(id, dto);
    return PaymentResponseDto.fromDomain(payment);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar pago',
    description: 'Elimina permanentemente un registro de pago.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único del pago',
    format: 'uuid',
  })
  @ApiNoContentResponse({ description: 'Pago eliminado.' })
  @ApiNotFoundResponse({ description: 'El pago solicitado no existe.' })
  @ApiBadRequestResponse({ description: 'Identificador con formato inválido.' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.paymentService.remove(id);
  }
}
