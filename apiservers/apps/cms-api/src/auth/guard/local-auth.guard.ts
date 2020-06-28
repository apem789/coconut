import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/** local策略 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}