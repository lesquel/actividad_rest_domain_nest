import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { Review } from '../../../domain/entities/review.entity.js';

export class ReviewResponseDto {
  @ApiProperty({
    description: 'Identificador único de la reseña',
    format: 'uuid',
    example: 'f5b8df5c-6998-4d2c-b781-21b3e6d2e3b3',
  })
  id!: string;

  @ApiProperty({
    description: 'Identificador del usuario autor de la reseña',
    format: 'uuid',
    example: '2f5e357b-9a09-47ae-a548-452ca9d2b6c5',
  })
  userId!: string;

  @ApiProperty({
    description: 'Identificador del restaurante evaluado',
    format: 'uuid',
    example: 'dc0b6fd5-3c61-4f46-a513-5514b3f43a3f',
  })
  restaurantId!: string;

  @ApiProperty({
    description: 'Calificación otorgada (1 a 5)',
    type: Number,
    example: 4,
  })
  rating!: number;

  @ApiPropertyOptional({
    description: 'Comentario escrito por el cliente',
    nullable: true,
    example: 'Gran experiencia y atención de calidad.',
  })
  comment?: string;

  @ApiProperty({
    description: 'Fecha de creación de la reseña (ISO8601)',
    example: '2025-03-10T18:20:00.000Z',
  })
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
