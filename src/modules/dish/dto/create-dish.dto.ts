import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDishDto {
  @ApiProperty({
    description: 'Identificador del restaurante al que pertenece el platillo',
    format: 'uuid',
    example: 'eb4ebdf2-5e56-4df6-8b0b-6f4b456bfb3d',
  })
  @IsUUID()
  restaurantId!: string;

  @ApiProperty({
    description: 'Identificador del menú que agrupa el platillo',
    format: 'uuid',
    example: '2b2b6a0a-9f46-4bf9-8d59-1cb9a4ba5787',
  })
  @IsUUID()
  menuId!: string;

  @ApiProperty({
    description: 'Nombre comercial del platillo',
    maxLength: 150,
    example: 'Tacos de camarón al pastor',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name!: string;

  @ApiPropertyOptional({
    description: 'Descripción breve del platillo, ingredientes o notas del chef',
    maxLength: 500,
    example: 'Tortilla de maíz azul rellena de camarones marinados con piña y chile ancho.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({
    description: 'Precio unitario del platillo en la moneda configurada',
    minimum: 0,
    type: Number,
    example: 145.5,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiPropertyOptional({
    description: 'Identificador de la imagen destacada del platillo',
    format: 'uuid',
    nullable: true,
    example: '67f2d9b0-1969-4afc-9b3e-8f743c881b5e',
  })
  @IsOptional()
  @IsUUID()
  imageId?: string;
}
