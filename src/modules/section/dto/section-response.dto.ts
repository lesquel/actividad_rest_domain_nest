import type { Section } from '../../../domain/entities/section.entity.js';

export class SectionResponseDto {
  id!: string;
  restaurantId!: string;
  name!: string;
  description?: string;

  static fromDomain(section: Section): SectionResponseDto {
    const dto = new SectionResponseDto();
    dto.id = section.id;
    dto.restaurantId = section.restaurant.id;
    dto.name = section.name;
    dto.description = section.description;
    return dto;
  }
}
