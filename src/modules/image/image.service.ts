import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { parseDate } from '../../common/utils/date.utils.js';
import type { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import type { Image } from '../../domain/entities/image.entity.js';
import type { ImageRepository } from '../../domain/repositories/image.repository.js';
import { IMAGE_REPOSITORY } from '../../application/tokens.js';
import type { CreateImageDto } from './dto/create-image.dto.js';
import type { UpdateImageDto } from './dto/update-image.dto.js';

@Injectable()
export class ImageService {
  constructor(
    @Inject(IMAGE_REPOSITORY) private readonly imageRepository: ImageRepository,
  ) {}

  async findAll({ offset, limit }: PaginationQueryDto = {}): Promise<Image[]> {
    return this.imageRepository.findAll({ offset, limit });
  }

  async findOne(id: string): Promise<Image> {
    const image = await this.imageRepository.findById(id);
    if (!image) {
      throw new NotFoundException(`Image with id ${id} not found.`);
    }
    return image;
  }

  async create(dto: CreateImageDto): Promise<Image> {
    const image: Image = {
      id: randomUUID(),
      url: dto.url,
      title: dto.title,
      description: dto.description,
      createdAt: dto.createdAt
        ? parseDate(dto.createdAt, 'createdAt')
        : new Date(),
      isActive: dto.isActive ?? true,
    };

    return this.imageRepository.create(image);
  }

  async update(id: string, dto: UpdateImageDto): Promise<Image> {
    const existing = await this.findOne(id);
    const updated: Image = {
      ...existing,
      url: dto.url ?? existing.url,
      title: dto.title ?? existing.title,
      description: dto.description ?? existing.description,
      createdAt: dto.createdAt
        ? parseDate(dto.createdAt, 'createdAt')
        : existing.createdAt,
      isActive: dto.isActive ?? existing.isActive,
    };

    return this.imageRepository.update(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.imageRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Image with id ${id} not found.`);
    }

    await this.imageRepository.delete(id);
  }
}
