import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import { AuthService } from "../auth.service";
import { JwtPayloadInterface } from "../interface/jwt-payload.interface";
import { Unauthorized } from "@libs/common/error/exception";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.CMS_API_JWT_SECRET,
    } as StrategyOptions)
  }
  
  async validate(payload: JwtPayloadInterface) {
    const { id } = payload
    const admin = await this.authService.getAdminByAdminId(id)
    if(!admin) {
      throw new Unauthorized('令牌错误')
    }
    return admin
  }
}
