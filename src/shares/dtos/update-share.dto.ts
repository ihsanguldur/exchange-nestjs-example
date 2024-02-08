import { IsCurrency, IsOptional, IsString, IsUppercase, MaxLength } from "class-validator";

export class UpdateShareDto {
	@IsString()
	@MaxLength(3)
	@MaxLength(3)
	@IsUppercase()
	@IsOptional()
	symbol: string;

	@IsString()
	@IsOptional()
	name: string;

	@IsCurrency({
		require_symbol: false,
		require_decimal: true,
		allow_decimal: true,
		digits_after_decimal: [2],
	})
	@IsOptional()
	currentPrice: number;
}