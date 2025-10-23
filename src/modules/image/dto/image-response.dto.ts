import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { Image } from '../../../domain/entities/image.entity.js';

export class ImageResponseDto {
  @ApiProperty({
    description: 'Identificador único de la imagen',
    format: 'uuid',
    example: '2880f5d5-1e6b-4ef4-a2f0-633d8bb53d45',
  })
  id!: string;

  @ApiProperty({
    description: 'URL accesible de la imagen',
    example: 'https://cdn.restaurants.example/images/sala-principal.jpg',
  })
  url!: string;

  @ApiPropertyOptional({
    description: 'Título descriptivo de la imagen',
    example: 'Sala principal',
    nullable: true,
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Descripción adicional de la imagen',
    example: 'Vista general de la sala principal del restaurante.',
    nullable: true,
  })
  description?: string;

  @ApiProperty({
    description: 'Fecha de creación en formato ISO8601',
    example: '2025-01-12T09:30:00.000Z',
  })
  createdAt!: string;

  @ApiProperty({
    description: 'Indica si la imagen está disponible para uso público',
    example: true,
  })
  isActive!: boolean;

  static fromDomain(image: Image): ImageResponseDto {
    const dto = new ImageResponseDto();
    dto.id = image.id;
    dto.url = image.url;
    dto.title = image.title;
    dto.description = image.description;
    dto.createdAt = image.createdAt.toISOString();
    dto.isActive = image.isActive;
    return dto;
  }
}
