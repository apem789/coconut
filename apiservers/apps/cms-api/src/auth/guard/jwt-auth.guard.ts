import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { Forbidden, Unauthorized } from "@libs/common/error/exception";
import { Reflector } from "@nestjs/core";
import { isString, isArray } from "util";

/** cms-api JWT守卫 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector
  ) {
    super()
  }

  // 校验拓展
  // 最后需调用 父类的canActivate 才会执行原来passport-jwt的校验逻辑
  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const notJwtAuthGuardKey = 'NotJwtAuthGuard'
    const notJwtAuthGurads = this.reflector.getAllAndMerge<string[]>(notJwtAuthGuardKey, [
      ctx.getHandler(),
      ctx.getClass()
    ])

    let hasJwtAuthGuardKey = false
    if(isString(notJwtAuthGurads)) {
      hasJwtAuthGuardKey = notJwtAuthGurads === notJwtAuthGuardKey
    }
    if(isArray(notJwtAuthGurads)) {
      hasJwtAuthGuardKey = notJwtAuthGurads.some(item => item === notJwtAuthGuardKey)
    }
    if(hasJwtAuthGuardKey) {
      // 当检测到 NotJwtAuthGuard 则不会去执行父类的jwt校验了
      console.log('接口：', ctx.switchToHttp().getRequest().path, ' 无须令牌也能访问')
      return true
    }

    return super.canActivate(ctx)
  }

  // 异常处理
  handleRequest(err, user, info) {
    // console.log('err: ', err) // Error || null
    // console.log('user: ', user) // boolean
    // console.log('info: ', info) // ErrorStact Info
    if(err || !user) {
      throw err || new Forbidden()
    }
    return user
  }
}
