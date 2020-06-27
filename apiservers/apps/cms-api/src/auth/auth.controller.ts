import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { ParamsException } from '@libs/common/error/exception';
import { AuthService } from './auth.service';
import { AdminCreateDto } from '@libs/common/dto/admin/admin-create.dto';

@ApiTags('授权模块')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @ApiOperation({ summary: '登录' })
  @ApiBody({ required: false })
  @Post('login')
  login(@Body() body) {
    // throw new ParamsException('自定义错误信息')
    // 正常返回时
    return body
  }

  @ApiOperation({ summary: '注册' })
  @Post('register')
  register(@Body() adminCreateDto: AdminCreateDto) {
    return this.authService.register(adminCreateDto)
  }
}
