import { IsNumber, Min } from "class-validator";

export class TransactionDto {
	@IsNumber()
	@Min(1)
	quantity: number;
}