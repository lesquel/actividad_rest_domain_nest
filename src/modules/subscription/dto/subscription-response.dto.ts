import type { Subscription } from '../../../domain/entities/subscription.entity.js';

export class SubscriptionResponseDto {
  id!: string;
  userId!: string;
  restaurantId!: string;
  planId!: string;
  startsOn!: string;
  endsOn?: string | null;
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
