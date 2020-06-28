import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/** cms-api JWT策略 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
