import type { Image } from '../../../domain/entities/image.entity.js';

export class ImageResponseDto {
  id!: string;
  url!: string;
  title?: string;
  description?: string;
  createdAt!: string;
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
