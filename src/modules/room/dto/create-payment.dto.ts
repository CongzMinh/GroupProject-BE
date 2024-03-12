import { IsNotEmpty } from "class-validator";

export class CreatePaymentDto {
    amount: number;
    method: number;
}