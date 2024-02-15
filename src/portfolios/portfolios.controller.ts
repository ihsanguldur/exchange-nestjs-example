import { Body, Controller, Post, UseGuards, Request, Get } from "@nestjs/common";
import { PortfoliosService } from "./portfolios.service";
import { AuthGuard } from "../shared/guards/auth.guard";
import { PortfolioDto } from "./dtos/portfolio.dto";
import { Serialize } from "../shared/interceptors/serialize.interceptor";
import { SerializePortfolioDto } from "./dtos/serialize-portfolio.dto";

@Serialize(SerializePortfolioDto)
@Controller('portfolios')
export class PortfoliosController {
	constructor(
		private portfoliosService: PortfoliosService
	) {}

	@UseGuards(AuthGuard)
	@Post()
	async create(@Body() body: PortfolioDto, @Request() req: any) {
		const portfolio = await this.portfoliosService.create(body.name, req.user.sub);
		return portfolio;
	}

	@UseGuards(AuthGuard)
	@Get()
	async get(@Request() req: any) {
		const portfolio = await this.portfoliosService.get(req.user.sub);
		return portfolio;
	}
}
