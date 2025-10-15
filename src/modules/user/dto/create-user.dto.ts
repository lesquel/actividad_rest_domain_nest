import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(100)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  names!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  phone!: string;
}
