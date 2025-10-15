import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address!: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  openingHours?: string;

  @IsInt()
  @Min(1)
  capacity!: number;

  @IsOptional()
  @IsUUID()
  imageId?: string;
}
