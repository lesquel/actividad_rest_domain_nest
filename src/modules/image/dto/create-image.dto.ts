import {
  IsBoolean,
  IsISO8601,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty({
    description: 'URL accesible públicamente de la imagen',
    maxLength: 255,
    example: 'https://cdn.restaurants.example/images/sala-principal.jpg',
  })
  @IsUrl()
  @MaxLength(255)
  url!: string;

  @ApiPropertyOptional({
    description: 'Título corto que describe la imagen',
    maxLength: 100,
    example: 'Sala principal',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @ApiPropertyOptional({
    description: 'Texto descriptivo adicional',
    maxLength: 255,
    example: 'Vista panorámica de la sala principal del restaurante.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @ApiPropertyOptional({
    description: 'Fecha de creación de la imagen en formato ISO8601',
    example: '2025-01-12T09:30:00.000Z',
    nullable: true,
  })
  @IsOptional()
  @IsISO8601()
  createdAt?: string;

  @ApiPropertyOptional({
    description: 'Bandera que indica si la imagen está activa',
    example: true,
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
