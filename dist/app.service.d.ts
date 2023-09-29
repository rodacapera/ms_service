import { ClientProxy } from '@nestjs/microservices';
import { CreateShipmentDto } from './dto';
import { HttpService } from '@nestjs/axios';
export declare class AppService {
    private client;
    private readonly httpService;
    constructor(client: ClientProxy, httpService: HttpService);
    getShipments(): Promise<import("rxjs").Observable<any>>;
    createShipment(data: CreateShipmentDto): Promise<import("rxjs").Observable<any>>;
    sendNotify(body: CreateShipmentDto): Promise<any>;
    getHello(): string;
}
