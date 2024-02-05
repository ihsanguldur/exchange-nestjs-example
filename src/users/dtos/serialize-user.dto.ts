import { Expose } from "class-transformer";

export class SerializeUserDto {
	@Expose()
	id: number;

	@Expose()
	email: string;
}