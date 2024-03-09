import { IsNotEmpty } from 'class-validator';

export class CreateContractDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    roomId: number;

    @IsNotEmpty()
    startDate: string;

    @IsNotEmpty()
    endDate: string;
}