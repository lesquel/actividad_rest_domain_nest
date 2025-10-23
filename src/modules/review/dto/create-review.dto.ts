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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Identificador del usuario que emite la reseña',
    format: 'uuid',
    example: '2f5e357b-9a09-47ae-a548-452ca9d2b6c5',
  })
  @IsUUID()
  userId!: string;

  @ApiProperty({
    description: 'Identificador del restaurante reseñado',
    format: 'uuid',
    example: 'dc0b6fd5-3c61-4f46-a513-5514b3f43a3f',
  })
  @IsUUID()
  restaurantId!: string;

  @ApiProperty({
    description: 'Calificación otorgada al restaurante (1 a 5)',
    minimum: 1,
    maximum: 5,
    type: Number,
    example: 4,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @ApiPropertyOptional({
    description: 'Comentario adicional del cliente',
    maxLength: 1000,
    example: 'Servicio excelente y platillos con gran sabor.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  comment?: string;

  @ApiPropertyOptional({
    description: 'Fecha de creación de la reseña (ISO8601)',
    example: '2025-03-10T18:20:00.000Z',
    nullable: true,
  })
  @IsOptional()
  @IsISO8601()
  createdAt?: string;
}
