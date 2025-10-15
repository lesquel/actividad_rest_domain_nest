import type { LayoutObject } from '../../../domain/entities/layout-object.entity.js';

export class LayoutObjectResponseDto {
  id!: string;
  name?: string;
  type?: string;
  positionX!: number;
  positionY!: number;
  width!: number;
  height!: number;
  imageId?: string | null;
  imageUrl?: string | null;
  sectionIds!: string[];

  static fromDomain(object: LayoutObject): LayoutObjectResponseDto {
    const dto = new LayoutObjectResponseDto();
    dto.id = object.id;
    dto.name = object.name;
    dto.type = object.type;
    dto.positionX = object.positionX;
    dto.positionY = object.positionY;
    dto.width = object.width;
    dto.height = object.height;
    dto.imageId = object.image?.id ?? null;
    dto.imageUrl = object.image?.url ?? null;
    dto.sectionIds = object.sections?.map((section) => section.id) ?? [];
    return dto;
  }
}
