import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ParamsException, Unauthorized } from '@libs/common/error/exception';
import { AuthService } from './auth.service';
import { AdminCreateDto } from '@libs/common/dto/admin/admin-create.dto';
import { AdminLoginDto } from '@libs/common/dto/admin/admin-login.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Admin } from '@libs/db/entities/admin.entity';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { NotJwtAuthGuard } from '@libs/common/decorator/no-jwt-guard.decorator';

@ApiTags('授权模块')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @ApiOperation({ summary: '登录' })
  @UseGuards(LocalAuthGuard)
  @NotJwtAuthGuard()
  @Post('login')
  login(
    @Body() adminLoginDto: AdminLoginDto,
    @Req() req
  ) {
    // 经过LocalAuthGuard处理成功构可以在req.user中获取当前登录的用户
    const currentAdmin: Admin = req.user
    if(!currentAdmin) { throw new Unauthorized() }
    return this.authService.login(currentAdmin)
  }

  @ApiOperation({ summary: '注册' })
  @NotJwtAuthGuard()
  @Post('register')
  register(@Body() adminCreateDto: AdminCreateDto) {
    return this.authService.register(adminCreateDto)
  }

  // 测试
  // 最后得删掉这个危险的接口
  @ApiOperation({ summary: '测试jwt令牌' })
  @ApiBearerAuth()
  @Get('test')
  test(@Req() req) {
    const currentAdmin = req.user
    if(!currentAdmin) { throw new Unauthorized('无法解析出token对应的用户') }
    return currentAdmin
  }
}
