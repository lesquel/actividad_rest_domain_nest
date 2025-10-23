import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { Payment } from '../../../domain/entities/payment.entity.js';
import {
  PAYMENT_METHOD_VALUES,
  PAYMENT_STATUS_VALUES,
} from './payment.constants.js';

export class PaymentResponseDto {
  @ApiProperty({
    description: 'Identificador único del pago',
    format: 'uuid',
    example: '5b7cb1ef-6d3d-4a9f-8dd1-8fb35be1e3de',
  })
  id!: string;

  @ApiProperty({
    description: 'Identificador de la reservación pagada',
    format: 'uuid',
    example: '3e4a32bc-70d4-4ef0-93c4-9be9a5775d6c',
  })
  reservationId!: string;

  @ApiProperty({
    description: 'Identificador del usuario que realizó el pago',
    format: 'uuid',
    example: '8849224a-bd89-4c83-954c-c38c8174d879',
  })
  userId!: string;

  @ApiProperty({
    description: 'Monto liquidado',
    type: Number,
    example: 850.75,
  })
  amount!: number;

  @ApiProperty({
    description: 'Moneda del pago (ISO 4217)',
    example: 'MXN',
  })
  currency!: string;

  @ApiProperty({
    description: 'Método utilizado',
    enum: PAYMENT_METHOD_VALUES,
    example: 'CARD',
  })
  method!: Payment['method'];

  @ApiProperty({
    description: 'Estado actual del pago',
    enum: PAYMENT_STATUS_VALUES,
    example: 'PAID',
  })
  status!: Payment['status'];

  @ApiProperty({
    description: 'Fecha y hora de liquidación (ISO8601)',
    example: '2025-05-18T17:25:43.511Z',
  })
  paidAt!: string;

  @ApiPropertyOptional({
    description: 'Referencia de pago registrada',
    maxLength: 100,
    example: 'TICKET-982734',
    nullable: true,
  })
  reference?: string;

  @ApiPropertyOptional({
    description: 'Notas adicionales sobre el pago',
    nullable: true,
    example: 'Pagado en terminal presencial con código de descuento.',
  })
  notes?: string;

  static fromDomain(payment: Payment): PaymentResponseDto {
    const dto = new PaymentResponseDto();
    dto.id = payment.id;
    dto.reservationId = payment.reservation.id;
    dto.userId = payment.user.id;
    dto.amount = payment.amount;
    dto.currency = payment.currency;
    dto.method = payment.method;
    dto.status = payment.status;
    dto.paidAt = payment.paidAt.toISOString();
    dto.reference = payment.reference;
    dto.notes = payment.notes;
    return dto;
  }
}
