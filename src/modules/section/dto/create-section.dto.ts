import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSectionDto {
  @ApiProperty({
    description: 'Identificador del restaurante al que pertenece la sección',
    format: 'uuid',
    example: '1d079614-6712-4f98-9a8b-f50506f8a59f',
  })
  @IsUUID()
  restaurantId!: string;

  @ApiProperty({
    description: 'Nombre comercial de la sección',
    maxLength: 120,
    example: 'Terraza VIP',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name!: string;

  @ApiPropertyOptional({
    description: 'Descripción breve de la sección',
    maxLength: 500,
    example: 'Espacio al aire libre con vista panorámica.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
