import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateSectionDto {
  @IsOptional()
  @IsUUID()
  restaurantId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
