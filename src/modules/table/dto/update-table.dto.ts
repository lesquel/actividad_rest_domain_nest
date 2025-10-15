import { IsInt, IsOptional, IsUUID, Min } from 'class-validator';

export class UpdateTableDto {
  @IsOptional()
  @IsUUID()
  sectionId?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  tableNumber?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;

  @IsOptional()
  @IsInt()
  positionX?: number;

  @IsOptional()
  @IsInt()
  positionY?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  width?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  height?: number;

  @IsOptional()
  @IsUUID()
  imageId?: string;
}
