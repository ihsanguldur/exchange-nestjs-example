import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SharesModule } from './shares/shares.module';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [UsersModule, SharesModule, PortfoliosModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
