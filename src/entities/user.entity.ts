import {
	Column,
	CreateDateColumn,
	Entity, OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Portfolio } from "./portfolio.entity";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@OneToMany(() => Portfolio, (portfolio) => portfolio.user)
	portfolios: Portfolio[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}