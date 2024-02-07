import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "../entities/user.entity";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { JwtService } from "@nestjs/jwt";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}


	private async hashPassword(salt, password, n): Promise<string> {
		const hash = (await scrypt(password, salt, 32)) as Buffer;
		return hash.toString("hex");
	}

	async signUp(email: string, password: string): Promise<User> {
		const exists = await this.usersService.getOne(email);
		if(exists) {
			throw new BadRequestException("email is already used");
		}

		const salt = randomBytes(8).toString("hex");
		const hash = await this.hashPassword(salt, password, 32);
		const result = `${salt}.${hash}`;

		const user = await this.usersService.create(email, result);

		return user;
	}

	async signIn(email: string, password: string) {
		const user = await this.usersService.getOne(email);
		if(!user) {
			throw new NotFoundException("user not found");
		}

		const [salt, storedHash] = user.password.split(".");

		const hash = await this.hashPassword(salt, password, 32);
		if(hash !== storedHash) {
			throw new BadRequestException("password not correct");
		}

		const payload = {
			sub: user.id,
			email: user.email
		}
		const token = await this.jwtService.signAsync(payload);

		return { token };
	}
}
