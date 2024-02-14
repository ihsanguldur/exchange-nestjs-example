import { Module } from '@nestjs/common';
import { PortfoliosController } from './portfolios.controller';
import { PortfoliosService } from './portfolios.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Portfolio } from "../entities/portfolio.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio])],
  controllers: [PortfoliosController],
  providers: [PortfoliosService, JwtService],
  exports: [PortfoliosService]
})
export class PortfoliosModule {}
