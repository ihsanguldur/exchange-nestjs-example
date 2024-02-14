import { MigrationInterface, QueryRunner } from "typeorm";

export class SharesAddColumnQuantity1707751738350 implements MigrationInterface {
    name = 'SharesAddColumnQuantity1707751738350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "share" ADD "quantity" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "share" ALTER COLUMN "currentPrice" TYPE numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "share" ALTER COLUMN "currentPrice" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "share" DROP COLUMN "quantity"`);
    }

}
