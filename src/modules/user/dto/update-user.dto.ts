import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Correo electrónico del usuario',
    format: 'email',
    maxLength: 100,
    example: 'ana.garcia@example.com',
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @ApiPropertyOptional({
    description: 'Nombre(s) actualizados del usuario',
    maxLength: 100,
    example: 'Ana Garcia',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  names?: string;

  @ApiPropertyOptional({
    description: 'Número de teléfono de contacto',
    maxLength: 15,
    example: '+52 55 9876 5432',
  })
  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone?: string;
}
