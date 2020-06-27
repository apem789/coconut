import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '@libs/common';
import { DbModule } from '@libs/db';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ResponseInterceptor } from '@libs/common/interceptor/response.interceptor';
import { AllExceptionFilter } from '@libs/common/filter/all-exception.filter';

@Module({
  imports: [
    CommonModule,
    DbModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter
    }
  ],
})
export class AppModule {}
