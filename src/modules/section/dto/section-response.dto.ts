import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { Section } from '../../../domain/entities/section.entity.js';

export class SectionResponseDto {
  @ApiProperty({
    description: 'Identificador único de la sección',
    format: 'uuid',
    example: 'a9eb513e-884c-48b7-9fa0-0b57776578b5',
  })
  id!: string;

  @ApiProperty({
    description: 'Identificador del restaurante al que pertenece la sección',
    format: 'uuid',
    example: '1d079614-6712-4f98-9a8b-f50506f8a59f',
  })
  restaurantId!: string;

  @ApiProperty({
    description: 'Nombre de la sección',
    example: 'Terraza VIP',
  })
  name!: string;

  @ApiPropertyOptional({
    description: 'Descripción de la sección',
    nullable: true,
    example: 'Espacio al aire libre con vista panorámica.',
  })
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
