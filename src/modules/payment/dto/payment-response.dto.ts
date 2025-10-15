import type { Payment } from '../../../domain/entities/payment.entity.js';

export class PaymentResponseDto {
  id!: string;
  reservationId!: string;
  userId!: string;
  amount!: number;
  currency!: string;
  method!: Payment['method'];
  status!: Payment['status'];
  paidAt!: string;
  reference?: string;
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
