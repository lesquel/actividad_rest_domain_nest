import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { Subscription } from '../../../domain/entities/subscription.entity.js';
import { SUBSCRIPTION_STATUS_VALUES } from './subscription.constants.js';

export class SubscriptionResponseDto {
  @ApiProperty({
    description: 'Identificador único de la suscripción',
    format: 'uuid',
    example: '92a3d8de-ea9f-4e2b-99da-095d29d36347',
  })
  id!: string;

  @ApiProperty({
    description: 'Identificador del usuario suscriptor',
    format: 'uuid',
    example: 'c90da0d8-5c8c-4a03-8dab-3f6dcb6d58d1',
  })
  userId!: string;

  @ApiProperty({
    description: 'Identificador del restaurante',
    format: 'uuid',
    example: '8a029508-6246-42f5-ad02-fde6fcb58a35',
  })
  restaurantId!: string;

  @ApiProperty({
    description: 'Identificador del plan contratado',
    format: 'uuid',
    example: '3f2865f3-2ce6-4b35-92c4-03bf0d7b2b92',
  })
  planId!: string;

  @ApiProperty({
    description: 'Fecha de inicio de la suscripción (ISO8601)',
    example: '2025-01-01T00:00:00.000Z',
  })
  startsOn!: string;

  @ApiPropertyOptional({
    description: 'Fecha de término de la suscripción o null si es indefinida',
    example: '2025-12-31T00:00:00.000Z',
    nullable: true,
  })
  endsOn?: string | null;

  @ApiProperty({
    description: 'Estado actual de la suscripción',
    enum: SUBSCRIPTION_STATUS_VALUES,
    example: 'ACTIVE',
  })
  status!: Subscription['status'];

  static fromDomain(subscription: Subscription): SubscriptionResponseDto {
    const dto = new SubscriptionResponseDto();
    dto.id = subscription.id;
    dto.userId = subscription.user.id;
    dto.restaurantId = subscription.restaurant.id;
    dto.planId = subscription.plan.id;
    dto.startsOn = subscription.startsOn.toISOString();
    dto.endsOn = subscription.endsOn ? subscription.endsOn.toISOString() : null;
    dto.status = subscription.status;
    return dto;
  }
}
