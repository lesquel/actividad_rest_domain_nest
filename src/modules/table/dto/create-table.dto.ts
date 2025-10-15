import { IsInt, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateTableDto {
  @IsUUID()
  sectionId!: string;

  @IsInt()
  @Min(1)
  tableNumber!: number;

  @IsInt()
  @Min(1)
  capacity!: number;

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
