import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import type { Image } from '../../domain/entities/image.entity.js';
import type { Restaurant } from '../../domain/entities/restaurant.entity.js';
import type { Section } from '../../domain/entities/section.entity.js';
import type { DiningTable } from '../../domain/entities/table.entity.js';
import type { ImageRepository } from '../../domain/repositories/image.repository.js';
import type { SectionRepository } from '../../domain/repositories/section.repository.js';
import type { TableRepository } from '../../domain/repositories/table.repository.js';
import {
  IMAGE_REPOSITORY,
  SECTION_REPOSITORY,
  TABLE_REPOSITORY,
} from '../../application/tokens.js';
import type { CreateTableDto } from './dto/create-table.dto.js';
import type { UpdateTableDto } from './dto/update-table.dto.js';

@Injectable()
export class TableService {
  constructor(
    @Inject(TABLE_REPOSITORY) private readonly tableRepository: TableRepository,
    @Inject(SECTION_REPOSITORY)
    private readonly sectionRepository: SectionRepository,
    @Inject(IMAGE_REPOSITORY)
    private readonly imageRepository: ImageRepository,
  ) {}

  async findAll({ offset, limit }: PaginationQueryDto = {}): Promise<
    DiningTable[]
  > {
    return this.tableRepository.findAll({ offset, limit });
  }

  async findOne(id: string): Promise<DiningTable> {
    const table = await this.tableRepository.findById(id);
    if (!table) {
      throw new NotFoundException(`Table with id ${id} not found.`);
    }
    return table;
  }

  async create(dto: CreateTableDto): Promise<DiningTable> {
    const section = await this.resolveSection(dto.sectionId);
    const image = await this.resolveImage(dto.imageId);

    const table: DiningTable = {
      id: randomUUID(),
      section,
      tableNumber: dto.tableNumber,
      capacity: dto.capacity,
      positionX: dto.positionX,
      positionY: dto.positionY,
      width: dto.width,
      height: dto.height,
      image,
    };

    return this.tableRepository.create(table);
  }

  async update(id: string, dto: UpdateTableDto): Promise<DiningTable> {
    const existing = await this.findOne(id);
    const section =
      dto.sectionId === undefined
        ? existing.section
        : await this.resolveSection(dto.sectionId);
    const image =
      dto.imageId === undefined
        ? existing.image
        : await this.resolveImage(dto.imageId);

    const updated: DiningTable = {
      ...existing,
      section,
      tableNumber: dto.tableNumber ?? existing.tableNumber,
      capacity: dto.capacity ?? existing.capacity,
      positionX: dto.positionX ?? existing.positionX,
      positionY: dto.positionY ?? existing.positionY,
      width: dto.width ?? existing.width,
      height: dto.height ?? existing.height,
      image,
    };

    return this.tableRepository.update(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.tableRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Table with id ${id} not found.`);
    }

    await this.tableRepository.delete(id);
  }

  private async resolveSection(id: string): Promise<Section> {
    const section = await this.sectionRepository.findById(id);
    if (!section) {
      throw new NotFoundException(`Section with id ${id} not found.`);
    }
    return section;
  }

  private async resolveImage(imageId?: string): Promise<Image | null> {
    if (!imageId) {
      return null;
    }

    const image = await this.imageRepository.findById(imageId);
    if (!image) {
      throw new NotFoundException(`Image with id ${imageId} not found.`);
    }
    return image;
  }
}
