import { AppService } from './app.service';
import { CreateShipmentDto } from './dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getShipments(): Promise<any>;
    shipments(body: CreateShipmentDto): Promise<any>;
}
