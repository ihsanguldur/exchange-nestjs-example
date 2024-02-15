import { Module, ValidationPipe } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { SharesModule } from "./shares/shares.module";
import { PortfoliosModule } from "./portfolios/portfolios.module";
import { TransactionsModule } from "./transactions/transactions.module";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { CustomExceptionFilter } from "./shared/filters/custom-exception.filter";
import { SuccessResponseInterceptor } from "./shared/interceptors/success-response.interceptor";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `.env.${process.env.NODE_ENV}`
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: "postgres",
				host: configService.get("DB_HOST"),
				port: configService.get("DB_PORT"),
				username: configService.get("DB_USERNAME"),
				password: configService.get("DB_PASSWORD"),
				database: configService.get("DB_NAME"),
				entities: ["dist/entities/*.js"],
				migrations: ["dist/migrations/*.js"],
				autoLoadEntities: true,
				migrationsRun: true,
				logging: process.env.NODE_ENV === "development",
			}),
			dataSourceFactory: async (options) => {
				const dataSource = await new DataSource(options).initialize();
				console.log("database connection established successfully.");
				return dataSource;
			}
		}),
		UsersModule,
		SharesModule,
		PortfoliosModule,
		TransactionsModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_PIPE,
			useValue: new ValidationPipe({
				whitelist: true
			})
		},
		{
			provide: APP_FILTER,
			useValue: new CustomExceptionFilter()
		},
		{
			provide: APP_INTERCEPTOR,
			useValue: new SuccessResponseInterceptor()
		}
	]
})
export class AppModule {
}
