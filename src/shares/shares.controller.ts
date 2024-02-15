import { Body, Controller, Get, Param, Patch, Post, UseGuards, Request } from "@nestjs/common";
import { ShareDto } from "./dtos/share-dto";
import { AuthGuard } from "../shared/guards/auth.guard";
import { SharesService } from "./shares.service";
import { UpdateShareDto } from "./dtos/update-share.dto";

   @Controller('shares')
export class SharesController {
	constructor(
		private sharesService: SharesService
	) {}

	// just for creating share there is no need for authentication
	@Post()
	async create(@Body() body: ShareDto) {
		const share = await this.sharesService.create(body.symbol, body.name, body.currentPrice, body.quantity);
		return share;
	}

	// just for creating share there is no need for authentication
	@Patch("/:id")
	async update(@Param("id") id: string, @Body() body: UpdateShareDto) {
		const update = await this.sharesService.update(parseInt(id), body);
		return update;
	}

	@UseGuards(AuthGuard)
	@Get()
	async list() {
		const shares = await this.sharesService.list();
		return shares;
	}

	@UseGuards(AuthGuard)
	@Get("/:id")
	async getOne(@Param("id") id: string) {
		const share = await this.sharesService.getOneById(parseInt(id));
		return share;
	}

}
