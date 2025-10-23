import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSectionDto {
  @ApiPropertyOptional({
    description: 'Identificador del restaurante de la sección',
    format: 'uuid',
    example: '1d079614-6712-4f98-9a8b-f50506f8a59f',
  })
  @IsOptional()
  @IsUUID()
  restaurantId?: string;

  @ApiPropertyOptional({
    description: 'Nombre actualizado de la sección',
    maxLength: 120,
    example: 'Terraza premium',
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @ApiPropertyOptional({
    description: 'Descripción actualizada de la sección',
    maxLength: 500,
    example: 'Espacio renovado con mobiliario premium.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
