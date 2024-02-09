import { Exclude, Expose } from "class-transformer";
import { User } from "../../entities/user.entity";

export class SerializePortfolioDto {
	@Expose()
	id: number;

	@Expose()
	name: string;
}