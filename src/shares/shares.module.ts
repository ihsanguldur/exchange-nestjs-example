import { Module } from '@nestjs/common';
import { SharesController } from './shares.controller';
import { SharesService } from './shares.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Share } from "../entities/share.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Share])],
  controllers: [SharesController],
  providers: [SharesService, JwtService]
})
export class SharesModule {}
