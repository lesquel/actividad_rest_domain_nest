import type { Reservation } from '../entities/reservation.entity.js';
import type { BaseRepository } from './base-repository.js';

export interface ReservationRepository extends BaseRepository<Reservation> {}
