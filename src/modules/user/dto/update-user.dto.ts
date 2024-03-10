import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    name: string;
  
    @IsOptional()
    @IsEmail()
    email: string;
  
    @IsOptional()
    @IsPhoneNumber()
    phoneNumber: string;
  
    @IsNotEmpty()
    DoB: string;

    @IsNotEmpty()
    Student_ID: string;


    @IsNotEmpty()
    password: string;
  }