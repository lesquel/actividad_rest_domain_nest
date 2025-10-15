import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import type { Image } from '../../domain/entities/image.entity.js';
import type { LayoutObject } from '../../domain/entities/layout-object.entity.js';
import type { ImageRepository } from '../../domain/repositories/image.repository.js';
import type { LayoutObjectRepository } from '../../domain/repositories/layout-object.repository.js';
import {
  IMAGE_REPOSITORY,
  LAYOUT_OBJECT_REPOSITORY,
} from '../../application/tokens.js';
import type { CreateLayoutObjectDto } from './dto/create-layout-object.dto.js';
import type { UpdateLayoutObjectDto } from './dto/update-layout-object.dto.js';

@Injectable()
export class LayoutObjectService {
  constructor(
    @Inject(LAYOUT_OBJECT_REPOSITORY)
    private readonly layoutObjectRepository: LayoutObjectRepository,
    @Inject(IMAGE_REPOSITORY) private readonly imageRepository: ImageRepository,
  ) {}

  async findAll({ offset, limit }: PaginationQueryDto = {}): Promise<
    LayoutObject[]
  > {
    return this.layoutObjectRepository.findAll({ offset, limit });
  }

  async findOne(id: string): Promise<LayoutObject> {
    const layoutObject = await this.layoutObjectRepository.findById(id);
    if (!layoutObject) {
      throw new NotFoundException(`Layout object with id ${id} not found.`);
    }
    return layoutObject;
  }

  async create(dto: CreateLayoutObjectDto): Promise<LayoutObject> {
    const image = await this.resolveImage(dto.imageId);
    const layoutObject: LayoutObject = {
      id: randomUUID(),
      name: dto.name,
      type: dto.type,
      positionX: dto.positionX,
      positionY: dto.positionY,
      width: dto.width,
      height: dto.height,
      image,
    };

    return this.layoutObjectRepository.create(layoutObject);
  }

  async update(id: string, dto: UpdateLayoutObjectDto): Promise<LayoutObject> {
    const existing = await this.findOne(id);
    const image =
      dto.imageId === undefined
        ? existing.image
        : await this.resolveImage(dto.imageId);

    const updated: LayoutObject = {
      ...existing,
      name: dto.name ?? existing.name,
      type: dto.type ?? existing.type,
      positionX: dto.positionX ?? existing.positionX,
      positionY: dto.positionY ?? existing.positionY,
      width: dto.width ?? existing.width,
      height: dto.height ?? existing.height,
      image,
    };

    return this.layoutObjectRepository.update(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.layoutObjectRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Layout object with id ${id} not found.`);
    }

    await this.layoutObjectRepository.delete(id);
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
