import { IsString } from "class-validator";

export class PortfolioDto {
	@IsString()
	name: string;
}