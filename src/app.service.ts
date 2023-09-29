import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateShipmentDto } from './dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class AppService {
  constructor(
    @Inject('SHIPMENTS_SERVICE') private client: ClientProxy,
    private readonly httpService: HttpService,
  ) {}

  async getShipments() {
    const result = this.client.send({ cmd: 'get-shipment' }, {});
    return result;
  }

  async createShipment(data: CreateShipmentDto) {
    const result = this.client.send({ cmd: 'create-shipment' }, data);
    return result;
  }

  async sendNotify(body: CreateShipmentDto) {
    const message = JSON.stringify({
      title: `the product ${body.content} is ${body.state}`,
    });
    const { data } = await firstValueFrom(
      this.httpService
        .post('http://localhost:3001/notification', message, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
