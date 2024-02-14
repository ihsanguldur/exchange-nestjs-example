import { Controller, Post, UseGuards, Request, Param, Body } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { AuthGuard } from "../shared/guards/auth.guard";
import { TransactionDto } from "./dtos/transaction.dto";
import { Serialize } from "../shared/interceptors/serialize.interceptor";
import { SerializeTransactionDto } from "./dtos/serialize-transaction.dto";

@Serialize(SerializeTransactionDto)
@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {
	constructor(
		private transactionsService: TransactionsService
	) {}

	@Post("buy/:id")
	async buy(@Param("id") shareId: string, @Request() req: any, @Body() body: TransactionDto) {
		const transaction = await this.transactionsService.buy(
			body.quantity,
			parseInt(shareId),
			req.user.sub
		);
		return transaction;
	}

	@Post("sell/:id")
	async sell(@Param("id") shareId: string, @Request() req: any, @Body() body: TransactionDto) {
		const transaction = await this.transactionsService.sell(
			body.quantity,
			parseInt(shareId),
			req.user.sub
		);
		return transaction;
	}
}
