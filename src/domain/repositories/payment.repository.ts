import type { Payment } from '../entities/payment.entity.js';
import type { BaseRepository } from './base-repository.js';

export interface PaymentRepository extends BaseRepository<Payment> {}
