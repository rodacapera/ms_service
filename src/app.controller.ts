import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateShipmentDto } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/shipment')
  getShipments(): Promise<any> {
    return this.appService.getShipments();
  }

  @Post('/shipment')
  shipments(@Body() body: CreateShipmentDto): Promise<any> {
    this.appService.sendNotify(body);
    return this.appService.createShipment(body);
  }
}
