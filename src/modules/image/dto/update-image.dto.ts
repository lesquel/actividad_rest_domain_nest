import {
  IsBoolean,
  IsISO8601,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateImageDto {
  @ApiPropertyOptional({
    description: 'Nueva URL accesible de la imagen',
    maxLength: 255,
    example: 'https://cdn.restaurants.example/images/sala-principal-v2.png',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  url?: string;

  @ApiPropertyOptional({
    description: 'Título corto actualizado',
    maxLength: 100,
    example: 'Sala principal renovada',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @ApiPropertyOptional({
    description: 'Descripción actualizada de la imagen',
    maxLength: 255,
    example: 'Nuevo decorado de la sala principal tras remodelación.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @ApiPropertyOptional({
    description: 'Fecha de captura o creación en formato ISO8601',
    example: '2025-04-02T18:45:00.000Z',
  })
  @IsOptional()
  @IsISO8601()
  createdAt?: string;

  @ApiPropertyOptional({
    description: 'Bandera de disponibilidad de la imagen',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
