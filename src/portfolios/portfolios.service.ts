import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Portfolio } from "../entities/portfolio.entity";
import { Repository } from "typeorm";

@Injectable()
export class PortfoliosService {
	constructor(
		@InjectRepository(Portfolio)
		private repository: Repository<Portfolio>
	) {}

	async create(name: string, userId: number): Promise<Portfolio> {
		const user = { id: userId };

		const isExists = await this.repository.findOneBy({ user });
		if(isExists) {
			throw new BadRequestException("user already has a portfolio");
		}

		const portfolio = this.repository.create({
			name,
			user,
		});
		await this.repository.save(portfolio);
		return portfolio;
	}

	async get(userId: number): Promise<Portfolio> {
		const user = { id: userId };

		const portfolio = await this.repository.findOneBy({ user });
		if(!portfolio) {
			throw new NotFoundException("portfolio not found");
		}

		return portfolio;
	}
}
