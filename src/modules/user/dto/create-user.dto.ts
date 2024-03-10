import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { Gender } from 'src/shared/enums/gender.enum';
import { Role } from 'src/shared/enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'reachme@amitavroy.com',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  Student_ID: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsNotEmpty()
  DoB: string;

  @IsNotEmpty()
  year_start: number;

  @IsNotEmpty()
  year_graduated: number;

  @ApiProperty({
    description: 'Password in plain text',
    example: 'Password@123',
  })
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  isHost: boolean;

  role: Role;

  @IsNotEmpty()
  gender: Gender;
}