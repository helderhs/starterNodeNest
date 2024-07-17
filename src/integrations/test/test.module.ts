import { Global, Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { TestIntegrationService } from './test.service';
import { AxiosRequestConfig, AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    TestIntegrationService,
    {
      provide: 'HTTP_INTERCEPTORS',
      useFactory: (httpService: HttpService) => {
        const axiosInstance = httpService.axiosRef;

        // Interceptor de requisição
        axiosInstance.interceptors.request.use(
          (config: AxiosRequestConfig) => {
            console.log('Interceptando Requisição:', config);
            // Adicione qualquer lógica que você queira aplicar na requisição
            return config;
          },
          (error: any) => {
            console.error('Erro na Requisição:', error);
            return Promise.reject(error);
          },
        );

        // Interceptor de resposta
        axiosInstance.interceptors.response.use(
          (response: AxiosResponse) => {
            console.log('Interceptando Resposta:', response.data);
            // Adicione qualquer lógica que você queira aplicar na resposta
            return response;
          },
          (error: any) => {
            console.error('Erro na Resposta:', error);
            return Promise.reject(error);
          },
        );

        return httpService;
      },
      inject: [HttpService],
    },
  ],
  exports: [TestIntegrationService],
})
export class TestModule {}
