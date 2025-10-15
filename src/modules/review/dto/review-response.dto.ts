import type { Review } from '../../../domain/entities/review.entity.js';

export class ReviewResponseDto {
  id!: string;
  userId!: string;
  restaurantId!: string;
  rating!: number;
  comment?: string;
  createdAt!: string;

  static fromDomain(review: Review): ReviewResponseDto {
    const dto = new ReviewResponseDto();
    dto.id = review.id;
    dto.userId = review.user.id;
    dto.restaurantId = review.restaurant.id;
    dto.rating = review.rating;
    dto.comment = review.comment;
    dto.createdAt = review.createdAt.toISOString();
    return dto;
  }
}
