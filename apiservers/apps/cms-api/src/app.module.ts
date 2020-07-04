import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '@libs/common';
import { DbModule } from '@libs/db';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR, APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ResponseInterceptor } from '@libs/common/interceptor/response.interceptor';
import { AllExceptionFilter } from '@libs/common/filter/all-exception.filter';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { CMSRBACInterceptor } from '@libs/common/interceptor/cms-rbac.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminPermissionRepository } from '@libs/common/repository/admin-permission.repository';

@Module({
  imports: [
    CommonModule,
    DbModule,
    AuthModule,
    TypeOrmModule.forFeature([AdminPermissionRepository])
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor // 全局响应转换拦截器
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter // 全局异常过滤器
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard       // 全局的JWTAuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CMSRBACInterceptor // 全局rbac
    }
  ],
})
export class AppModule {}
