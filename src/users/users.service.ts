import { HttpException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private repository: Repository<User>
	) {}

	async getOneById(id: number): Promise<User> {
		const user = await this.repository.findOneBy({id});
		if(!user) {
			throw new NotFoundException("user not found");
		}

		return user;
	}

	async getOne(email: string): Promise<User> {
		const user = await this.repository.findOneBy({email});
		return user;
	}

	async list(): Promise<User[]> {
		const user = await this.repository.find();
		return user;
	}

	async create(email: string, password: string): Promise<User> {
		const user = this.repository.create({email, password});
		const saved = await this.repository.save(user);

		return saved;
	}
}
