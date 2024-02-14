import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Transaction } from "../entities/transaction.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, Repository } from "typeorm";
import { PortfoliosService } from "../portfolios/portfolios.service";
import { TRANSACTION_BUY, TRANSACTION_SELL } from "../config/constants";
import { SharesService } from "../shares/shares.service";
import { Share } from "../entities/share.entity";

@Injectable()
export class TransactionsService {
	constructor(
		@InjectRepository(Transaction)
		private repository: Repository<Transaction>,
		private portfoliosService: PortfoliosService
	) {}

	async getTotalQuantity(portfolioId: number, shareId: number): Promise<number> {
		const { totalQuantity } = await this.repository
		.createQueryBuilder()
		.select(
			`
			SUM(CASE 
				WHEN Transaction.type = '${TRANSACTION_BUY}' 
				THEN Transaction.quantity 
				ELSE 0 
				END) - 
			SUM(CASE
				WHEN Transaction.type = '${TRANSACTION_SELL}'
				THEN "Transaction"."quantity"
				ELSE 0
				END)`,
			"totalQuantity")
		.where("Transaction.portfolioId = :portfolioId", { portfolioId })
		.andWhere("Transaction.shareId = :shareId", { shareId })
		.getRawOne();

		if(!totalQuantity) {
			return 0;
		}

		return totalQuantity as number;
	}

	async buy(quantity: number, shareId: number, userId: number): Promise<Transaction> {
		const portfolio = await this.portfoliosService.get(userId);
		if(!portfolio) {
			throw new NotFoundException("portfolio not found");
		}

		const queryRunner = this.repository.manager.connection.createQueryRunner();
		await queryRunner.startTransaction();
		try {
			const lockShare = await queryRunner.manager.findOne(Share, {
				where: { id: shareId },
				lock: { mode: "pessimistic_write" }
			});
			if (!lockShare) {
				throw new NotFoundException("share not found");
			}

			const newQuantity = lockShare.quantity - quantity;
			if (newQuantity < 0) {
				throw new BadRequestException("there is not enough quantity for this share");
			}
			Object.assign(lockShare, { quantity: newQuantity });

			const transaction = queryRunner.manager.create(Transaction, {
				type: TRANSACTION_BUY,
				quantity,
				price: lockShare.currentPrice,
				portfolio,
				share: lockShare
			});

			await queryRunner.manager.save(lockShare);
			await queryRunner.manager.save(transaction);

			await queryRunner.commitTransaction();

			return transaction;
		} catch (e: any) {
			await queryRunner.rollbackTransaction();
			throw e;
		} finally {
			await queryRunner.release();
		}
	}

	async sell(quantity: number, shareId: number, userId: number): Promise<Transaction> {
		const portfolio = await this.portfoliosService.get(userId);
		if(!portfolio) {
			throw new NotFoundException("portfolio not found");
		}

		const totalShareQuantity = await this.getTotalQuantity(portfolio.id, shareId);
		if(quantity > totalShareQuantity) {
			throw new BadRequestException("there is not enough share for sell");
		}

		const queryRunner = this.repository.manager.connection.createQueryRunner();
		await queryRunner.startTransaction();
		try {
			const lockShare = await queryRunner.manager.findOne(Share, {
				where: { id: shareId },
				lock: { mode: "pessimistic_write" }
			});
			if (!lockShare) {
				throw new NotFoundException("share not found");
			}

			const newQuantity = lockShare.quantity + quantity;
			Object.assign(lockShare, { quantity: newQuantity });

			const transaction = queryRunner.manager.create(Transaction, {
				type: TRANSACTION_SELL,
				quantity,
				price: lockShare.currentPrice,
				portfolio,
				share: lockShare
			});

			await queryRunner.manager.save(lockShare);
			await queryRunner.manager.save(transaction);

			await queryRunner.commitTransaction();

			return transaction;
		} catch (e: any) {
			await queryRunner.rollbackTransaction();
			throw e;
		} finally {
			await queryRunner.release();
		}
	}
}
