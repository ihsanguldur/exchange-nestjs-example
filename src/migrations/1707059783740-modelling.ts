import { MigrationInterface, QueryRunner } from "typeorm";

export class Modelling1707059783740 implements MigrationInterface {
    name = 'Modelling1707059783740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "share" ("id" SERIAL NOT NULL, "symbol" character varying(3) NOT NULL, "name" character varying, "currentPrice" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2bf54e73ed1d4ba516f22d0be7d" UNIQUE ("symbol"), CONSTRAINT "PK_67a2b28d2cff31834bc2aa1ed7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "type" character varying(4) NOT NULL, "quantity" integer NOT NULL, "price" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "portfolioId" integer, "shareId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "portfolio" ("id" SERIAL NOT NULL, "name" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_6936bb92ca4b7cda0ff28794e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_7467fcafde3e7e9375b8c0ba1a6" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_1906c9dd9ad7dc125d4bbc68375" FOREIGN KEY ("shareId") REFERENCES "share"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "portfolio" ADD CONSTRAINT "FK_9d041c43c782a9135df1388ae16" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "portfolio" DROP CONSTRAINT "FK_9d041c43c782a9135df1388ae16"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_1906c9dd9ad7dc125d4bbc68375"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_7467fcafde3e7e9375b8c0ba1a6"`);
        await queryRunner.query(`DROP TABLE "portfolio"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "share"`);
    }

}
