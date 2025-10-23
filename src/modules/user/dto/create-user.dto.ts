import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Correo electrónico único del usuario',
    format: 'email',
    maxLength: 100,
    example: 'ana.garcia@example.com',
  })
  @IsEmail()
  @MaxLength(100)
  email!: string;

  @ApiProperty({
    description: 'Nombre(s) completos del usuario',
    maxLength: 100,
    example: 'Ana Maria Garcia',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  names!: string;

  @ApiProperty({
    description: 'Número de teléfono de contacto',
    maxLength: 15,
    example: '+52 55 1234 5678',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  phone!: string;
}
