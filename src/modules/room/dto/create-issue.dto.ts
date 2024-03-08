import { IsNotEmpty } from "class-validator";

export class CreateIssueDto {
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    fixed: boolean;
}