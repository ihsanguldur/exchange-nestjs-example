import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Transaction } from "./transaction.entity";

@Entity()
export class Share {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true, length: 3})
	symbol: string;

	@Column({ nullable: true })
	name: string;

	@Column({ type: "decimal", scale: 2})
	currentPrice: number;

	@OneToMany(() => Transaction, (transaction) => transaction.share)
	transactions: Transaction[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}