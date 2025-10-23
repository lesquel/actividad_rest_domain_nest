import { Type } from 'class-transformer';
import {
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReviewDto {
  @ApiPropertyOptional({
    description: 'Identificador del usuario autor de la reseña',
    format: 'uuid',
    example: '2f5e357b-9a09-47ae-a548-452ca9d2b6c5',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Identificador del restaurante reseñado',
    format: 'uuid',
    example: 'dc0b6fd5-3c61-4f46-a513-5514b3f43a3f',
  })
  @IsOptional()
  @IsUUID()
  restaurantId?: string;

  @ApiPropertyOptional({
    description: 'Calificación actualizada (1 a 5)',
    type: Number,
    minimum: 1,
    maximum: 5,
    example: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({
    description: 'Comentario actualizado del cliente',
    maxLength: 1000,
    example: 'Súper atentos y comida memorable.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  comment?: string;

  @ApiPropertyOptional({
    description: 'Fecha de creación/actualización (ISO8601)',
    example: '2025-03-11T12:45:00.000Z',
  })
  @IsOptional()
  @IsISO8601()
  createdAt?: string;
}
