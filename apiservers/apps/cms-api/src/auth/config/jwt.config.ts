import { Injectable } from "@nestjs/common";
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt'

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      secret: process.env.CMS_API_JWT_SECRET,
      signOptions: {
        expiresIn: eval(process.env.CMS_API_JWT_EXPRESSIN)
      }
    }
  }
}
