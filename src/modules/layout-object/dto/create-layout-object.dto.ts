import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLayoutObjectDto {
  @ApiPropertyOptional({
    description: 'Nombre o alias del objeto dentro del plano',
    maxLength: 100,
    example: 'Mesa 12',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    description: 'Tipo de objeto representado en el plano (mesa, barra, decoración, etc.)',
    maxLength: 50,
    example: 'table',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  type?: string;

  @ApiProperty({
    description: 'Posición horizontal del objeto en el lienzo',
    example: 120,
    minimum: 0,
    type: Number,
  })
  @IsInt()
  positionX!: number;

  @ApiProperty({
    description: 'Posición vertical del objeto en el lienzo',
    example: 240,
    minimum: 0,
    type: Number,
  })
  @IsInt()
  positionY!: number;

  @ApiProperty({
    description: 'Ancho del objeto en unidades del plano',
    example: 80,
    minimum: 1,
    type: Number,
  })
  @IsInt()
  @Min(1)
  width!: number;

  @ApiProperty({
    description: 'Alto del objeto en unidades del plano',
    example: 80,
    minimum: 1,
    type: Number,
  })
  @IsInt()
  @Min(1)
  height!: number;

  @ApiPropertyOptional({
    description: 'Identificador de la imagen asociada al objeto',
    format: 'uuid',
    example: 'b5c2f71f-8ca9-4cf4-87a4-2fb7d6e4ca01',
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  imageId?: string;
}
