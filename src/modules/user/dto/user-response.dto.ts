import type { User } from '../../../domain/entities/user.entity.js';

export class UserResponseDto {
  id!: string;
  email!: string;
  names!: string;
  phone!: string;

  static fromDomain(user: User): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id;
    dto.email = user.email;
    dto.names = user.names;
    dto.phone = user.phone;
    return dto;
  }
}
