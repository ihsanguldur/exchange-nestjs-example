import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Share } from "./share.entity";
import { Portfolio } from "./portfolio.entity";

@Entity()
export class Transaction {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 4 })
	type: string;

	@Column()
	quantity: number;

	@Column({ type: "decimal", scale: 2})
	price: number;

	@ManyToOne(() => Portfolio, (portfolio) => portfolio.transactions)
	portfolio: Portfolio;

	@ManyToOne(() => Share, (share) => share.transactions)
	share: Share;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}