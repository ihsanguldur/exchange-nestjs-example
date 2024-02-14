import { Expose, Transform } from "class-transformer";

export class SerializeTransactionDto {
	@Expose()
	id: number;

	@Expose()
	type: string;

	@Expose()
	quantity: number;

	@Transform(({ obj }) => obj.portfolio.id)
	@Expose()
	portfolioId: number;

	@Transform(({ obj }) => ({ id: obj.share.id, symbol: obj.share.symbol }))
	@Expose()
	share: { id: number, symbol: string };

	@Expose()
	createdAt: string;

	@Expose()
	updatedAt: string;
}