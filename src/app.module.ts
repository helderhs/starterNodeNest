import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { JwtAuthGuard } from './commons/guards/jwt-auth.guard';
import { RoleGuard } from './commons/guards/role-auth.guard';
import { HealthModule } from '@modules/health/health.module';
import { FilesModule } from '@modules/files/files.module';
import { DatabaseModule } from '@database/database.module';
import { GatewaysModule } from '@gateways/gateways.module';
import { TasksModule } from '@tasks/tasks.module';
import { LivrosModule } from '@modules/livros/livros.module';
import { TestModule } from './integrations/test/test.module';

@Module({
  imports: [
    TestModule,
    UsersModule,
    LivrosModule,
    AuthModule,
    FilesModule,
    HealthModule,
    GatewaysModule,
    DatabaseModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TasksModule,
    ServeStaticModule.forRoot({
      rootPath: resolve(process.cwd(), 'files'),
      serveRoot: '/files',
    }),
    WinstonModule.forRoot({
      exitOnError: false,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.splat(),
        winston.format.printf((info) => {
          const { level, timestamp, context, message } = info;
          return `[Nest] ${level} ${timestamp}:${context ? '[' + context + ']' : ''} ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
          filename: 'logs/%DATE%-Error.log',
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
        new winston.transports.DailyRotateFile({
          filename: 'logs/%DATE%-All.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
