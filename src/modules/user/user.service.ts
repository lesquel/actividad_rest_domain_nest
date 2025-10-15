import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import type { User } from '../../domain/entities/user.entity.js';
import type { UserRepository } from '../../domain/repositories/user.repository.js';
import { USER_REPOSITORY } from '../../application/tokens.js';
import type { CreateUserDto } from './dto/create-user.dto.js';
import type { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async findAll({ offset, limit }: PaginationQueryDto = {}): Promise<User[]> {
    return this.userRepository.findAll({ offset, limit });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user: User = {
      id: randomUUID(),
      email: dto.email,
      names: dto.names,
      phone: dto.phone,
    };

    return this.userRepository.create(user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const existing = await this.findOne(id);
    const updated: User = {
      ...existing,
      email: dto.email ?? existing.email,
      names: dto.names ?? existing.names,
      phone: dto.phone ?? existing.phone,
    };

    return this.userRepository.update(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.userRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    await this.userRepository.delete(id);
  }
}
