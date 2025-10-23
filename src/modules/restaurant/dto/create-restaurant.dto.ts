import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRestaurantDto {
  @ApiProperty({
    description: 'Nombre comercial del restaurante',
    maxLength: 150,
    example: 'La Terraza del Chef',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name!: string;

  @ApiPropertyOptional({
    description: 'Descripción general del concepto gastronómico',
    maxLength: 500,
    example: 'Experiencia gastronómica de autor con ingredientes de temporada.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({
    description: 'Dirección física del restaurante',
    maxLength: 255,
    example: 'Av. Reforma 123, Ciudad de México, MX',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address!: string;

  @ApiPropertyOptional({
    description: 'Horario de operación en formato libre',
    maxLength: 120,
    example: 'Lunes a sábado de 13:00 a 23:00',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  openingHours?: string;

  @ApiProperty({
    description: 'Capacidad máxima de comensales',
    type: Number,
    minimum: 1,
    example: 120,
  })
  @IsInt()
  @Min(1)
  capacity!: number;

  @ApiPropertyOptional({
    description: 'Identificador de la imagen destacada del restaurante',
    format: 'uuid',
    example: 'a3b1e88a-2946-4bfb-8c9d-b727ecbc8615',
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  imageId?: string;
}
