import {
  IsEnum,
  IsISO8601,
  IsOptional,
  IsUUID,
  ValidateIf,
} from 'class-validator';

import type { Subscription } from '../../../domain/entities/subscription.entity.js';
import { SUBSCRIPTION_STATUS_VALUES } from './subscription.constants.js';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty({
    description: 'Identificador del usuario que contrata la suscripción',
    format: 'uuid',
    example: 'c90da0d8-5c8c-4a03-8dab-3f6dcb6d58d1',
  })
  @IsUUID()
  userId!: string;

  @ApiProperty({
    description: 'Identificador del restaurante suscrito',
    format: 'uuid',
    example: '8a029508-6246-42f5-ad02-fde6fcb58a35',
  })
  @IsUUID()
  restaurantId!: string;

  @ApiProperty({
    description: 'Identificador del plan contratado',
    format: 'uuid',
    example: '3f2865f3-2ce6-4b35-92c4-03bf0d7b2b92',
  })
  @IsUUID()
  planId!: string;

  @ApiProperty({
    description: 'Fecha de inicio de la suscripción (ISO8601)',
    example: '2025-01-01T00:00:00.000Z',
  })
  @IsISO8601()
  startsOn!: string;

  @ApiPropertyOptional({
    description: 'Fecha de finalización (ISO8601) o null para renovaciones automáticas',
    example: '2025-12-31T00:00:00.000Z',
    nullable: true,
  })
  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsISO8601()
  endsOn?: string | null;

  @ApiPropertyOptional({
    description: 'Estado inicial de la suscripción',
    enum: SUBSCRIPTION_STATUS_VALUES,
    example: 'ACTIVE',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(SUBSCRIPTION_STATUS_VALUES)
  status?: Subscription['status'];
}
