import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { User } from "./user.entity";
import { Transaction } from "./transaction.entity";

@Entity()
export class Portfolio {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	name: string;

	@ManyToOne(() => User, (user) => user.portfolios)
	user: User;

	@OneToMany(() => Transaction, (transaction) => transaction.portfolio)
	transactions: Transaction[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}