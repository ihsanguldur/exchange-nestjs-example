import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express';

interface CustomExceptionResponse {
	statusCode: number;
	message: string[] & string;
	error: string;
}

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		let message = "something went wrong";
		let status = HttpStatus.INTERNAL_SERVER_ERROR;

		if(exception.constructor.prototype instanceof HttpException) {
			const httpException = (exception as HttpException)
			status = httpException.getStatus();
			message = (httpException.getResponse() as CustomExceptionResponse).message;
		} else {
			Logger.error((exception as any).message, (exception as any).stack, `${request.method} ${request.url}`);
		}

		response
			.status(status)
			.json({
				status: false,
				error: {
					statusCode: status,
					message,
					timestamp: new Date()
				}
			});
	}
}