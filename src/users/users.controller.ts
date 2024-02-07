import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";
import { Serialize } from "../shared/interceptors/serialize.interceptor";
import { SerializeUserDto } from "./dtos/serialize-user.dto";
import { UserDto } from "./dtos/user.dto";
import { AuthGuard } from "../shared/guards/auth.guard";

@Serialize(SerializeUserDto)
@Controller('users')
export class UsersController {
	constructor(
		private usersService: UsersService,
		private authService: AuthService
	) {}

	@Post()
	async signUp(@Body() body: UserDto) {
		const user = await this.authService.signUp(body.email, body.password);
		return user;
	}

	@Post("/signIn")
	async signIn(@Body() body: UserDto) {
		const user = await this.authService.signIn(body.email, body.password);
		return user;
	}

	@UseGuards(AuthGuard)
	@Get()
	async getUser(@Request() req: any) {
		const user = await this.usersService.getOneById(req.user.sub);
		return user;
	}
}
