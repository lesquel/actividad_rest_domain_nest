import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateLayoutObjectDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  type?: string;

  @IsInt()
  positionX!: number;

  @IsInt()
  positionY!: number;

  @IsInt()
  @Min(1)
  width!: number;

  @IsInt()
  @Min(1)
  height!: number;

  @IsOptional()
  @IsUUID()
  imageId?: string;
}
