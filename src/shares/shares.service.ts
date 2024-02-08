import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Share } from "../entities/share.entity";

@Injectable()
export class SharesService {
	constructor(
		@InjectRepository(Share)
		private repository: Repository<Share>
	) {}

	async getOneById(id: number): Promise<Share> {
		const share = await this.repository.findOneBy({id});
		if(!share) {
			throw new NotFoundException("share not found");
		}

		return share;
	}

	async list(): Promise<Share[]> {
		const shares = await this.repository.find();
		return shares;
	}

	async create(symbol: string, name: string, currentPrice: number): Promise<Share> {
		const isExists = await this.repository.findOneBy({ symbol });
		if(isExists) {
			throw new BadRequestException("symbol already exists");
		}

		const share = this.repository.create({
			symbol,
			name,
			currentPrice
		});

		await this.repository.save(share);
		return share;
	}

	async update(id: number, attrs: Partial<Share>): Promise<Share> {
		const share = await this.repository.findOneBy({ id });
		if(!share) {
			throw new NotFoundException("share not found");
		}

		if(attrs.symbol) {
			const isSymbolExists = await this.repository.findOneBy({ symbol: attrs.symbol });
			if(isSymbolExists) {
				throw new BadRequestException("symbol already used");
			}
		}

		Object.assign(share, attrs);

		await this.repository.save(share);
		return share;
	}
}
