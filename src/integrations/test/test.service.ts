import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TestIntegrationService {
  constructor(private readonly httpService: HttpService) {}

  async getData(): Promise<any> {
    const response = await this.httpService.get('https://api.thecatapi.com/v1/images/search');
    return lastValueFrom(response);
  }
}
