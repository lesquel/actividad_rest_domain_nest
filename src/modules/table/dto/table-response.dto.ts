import type { DiningTable } from '../../../domain/entities/table.entity.js';

export class TableResponseDto {
  id!: string;
  sectionId!: string;
  restaurantId!: string;
  tableNumber!: number;
  capacity!: number;
  positionX!: number;
  positionY!: number;
  width!: number;
  height!: number;
  imageId?: string | null;
  imageUrl?: string | null;

  static fromDomain(table: DiningTable): TableResponseDto {
    const dto = new TableResponseDto();
    dto.id = table.id;
    dto.sectionId = table.section.id;
    dto.restaurantId = table.section.restaurant.id;
    dto.tableNumber = table.tableNumber;
    dto.capacity = table.capacity;
    dto.positionX = table.positionX;
    dto.positionY = table.positionY;
    dto.width = table.width;
    dto.height = table.height;
    dto.imageId = table.image?.id ?? null;
    dto.imageUrl = table.image?.url ?? null;
    return dto;
  }
}
