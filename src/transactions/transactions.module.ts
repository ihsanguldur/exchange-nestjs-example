import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "../entities/transaction.entity";
import { PortfoliosModule } from "../portfolios/portfolios.module";
import { SharesModule } from "../shares/shares.module";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
      TypeOrmModule.forFeature([Transaction]),
      PortfoliosModule,
      SharesModule
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, JwtService]
})
export class TransactionsModule {}
