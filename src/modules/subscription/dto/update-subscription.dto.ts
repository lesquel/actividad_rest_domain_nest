import {
  IsEnum,
  IsISO8601,
  IsOptional,
  IsUUID,
  ValidateIf,
} from 'class-validator';

import type { Subscription } from '../../../domain/entities/subscription.entity.js';
import { SUBSCRIPTION_STATUS_VALUES } from './subscription.constants.js';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSubscriptionDto {
  @ApiPropertyOptional({
    description: 'Identificador del usuario suscriptor',
    format: 'uuid',
    example: 'c90da0d8-5c8c-4a03-8dab-3f6dcb6d58d1',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Identificador del restaurante asociado',
    format: 'uuid',
    example: '8a029508-6246-42f5-ad02-fde6fcb58a35',
  })
  @IsOptional()
  @IsUUID()
  restaurantId?: string;

  @ApiPropertyOptional({
    description: 'Identificador del plan contratado',
    format: 'uuid',
    example: '3f2865f3-2ce6-4b35-92c4-03bf0d7b2b92',
  })
  @IsOptional()
  @IsUUID()
  planId?: string;

  @ApiPropertyOptional({
    description: 'Fecha de inicio de la suscripción (ISO8601)',
    example: '2025-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsISO8601()
  startsOn?: string;

  @ApiPropertyOptional({
    description: 'Fecha de término o null para suscripción continua',
    example: '2025-12-31T00:00:00.000Z',
    nullable: true,
  })
  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsISO8601()
  endsOn?: string | null;

  @ApiPropertyOptional({
    description: 'Estado actual de la suscripción',
    enum: SUBSCRIPTION_STATUS_VALUES,
    example: 'PAUSED',
  })
  @IsOptional()
  @IsEnum(SUBSCRIPTION_STATUS_VALUES)
  status?: Subscription['status'];
}
