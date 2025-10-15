import {
  IsBoolean,
  IsISO8601,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateImageDto {
  @IsUrl()
  @MaxLength(255)
  url!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsISO8601()
  createdAt?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
