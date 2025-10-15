import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  names?: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone?: string;
}
