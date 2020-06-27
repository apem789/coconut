import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { ParamsException } from '@libs/common/error/exception';

@ApiTags('授权模块')
@Controller('auth')
export class AuthController {
  @ApiOperation({ summary: '登录' })
  @ApiBody({ required: false })
  @Post('login')
  login(@Body() body) {
    // throw new ParamsException('自定义错误信息')
    // 正常返回时
    return body
  }
}
