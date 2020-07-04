import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { NotJwtAuthGuard } from '@libs/common/decorator/no-jwt-guard.decorator';

@ApiTags('默认')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @NotJwtAuthGuard()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
