import { IsEmail, IsString, Matches, Max, Min, MinLength } from "class-validator";

export class UserDto {
	@IsEmail()
	email: string;

	@IsString()
	@MinLength(4)
	password: string;
}