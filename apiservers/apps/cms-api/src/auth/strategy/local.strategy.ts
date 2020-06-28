import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, IStrategyOptions } from 'passport-local'
import { AuthService } from "../auth.service";
import { AdminLoginDto } from "@libs/common/dto/admin/admin-login.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      usernameField: 'account',
      passwordField: 'secret'
    } as IStrategyOptions)
  }

  async validate(account: string, secret: string) {
    // 检验逻辑的实现
    // 去数据库中根据账号密码查用户
    const adminLoginDto: AdminLoginDto = { account, secret }
    const admin = await this.authService.getAdminByAccountAndSecret(adminLoginDto)
    return admin
  }
}
