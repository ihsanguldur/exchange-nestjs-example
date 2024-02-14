import { IsCurrency, IsNumber, IsString, IsUppercase, MaxLength, Min } from "class-validator";

export class ShareDto {
	@IsString()
	@MaxLength(3)
	@MaxLength(3)
	@IsUppercase()
	symbol: string;

	@IsString()
	name: string;

	@IsCurrency({
		require_symbol: false,
		require_decimal: true,
		allow_decimal: true,
		digits_after_decimal: [2],
	})
	currentPrice: number;

	@IsNumber()
	@Min(1)
	quantity: number;
}