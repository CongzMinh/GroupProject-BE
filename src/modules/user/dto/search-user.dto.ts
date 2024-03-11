import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchUserDto {
  @IsOptional()
  name: string;

  @IsOptional()
  Student_ID: string;
}