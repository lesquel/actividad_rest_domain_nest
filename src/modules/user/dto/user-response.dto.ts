import { ApiProperty } from '@nestjs/swagger';
import type { User } from '../../../domain/entities/user.entity.js';

export class UserResponseDto {
  @ApiProperty({
    description: 'Identificador único del usuario',
    format: 'uuid',
    example: '5f875760-6f0d-4d54-bd5a-7c2c9bb4e6fd',
  })
  id!: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    format: 'email',
    example: 'ana.garcia@example.com',
  })
  email!: string;

  @ApiProperty({
    description: 'Nombre(s) del usuario',
    example: 'Ana García',
  })
  names!: string;

  @ApiProperty({
    description: 'Número telefónico de contacto',
    example: '+52 55 1234 5678',
  })
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
