import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppCronModule } from './app.cron.module';

async function bootstrap() {
  // const app = await NestFactory.create<NestExpressApplication>(AppCronModule, {
  //   logger: false,
  // });
  const app = await NestFactory.createApplicationContext(AppCronModule);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  // app.useGlobalFilters(new ExceptionsFilter(app.get(HttpAdapterHost), logger));

  // await app.listen(3001); // Defina a porta que deseja ouvir, por exemplo, 3000
}
bootstrap();
