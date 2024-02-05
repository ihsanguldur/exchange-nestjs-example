import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { plainToInstance } from "class-transformer";

interface ClassConstructor {
	new(...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
	return UseInterceptors(new SerializeInterceptor(dto));
}

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
	constructor(private dto: any) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		// run something before a request handled
        return next.handle().pipe(map((data: any) => {
			// run something before a response sent out
	        return plainToInstance(this.dto, data, {
		        excludeExtraneousValues: true
	        });
        }));
    }

}