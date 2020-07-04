import { SetMetadata } from "@nestjs/common";

/** 无须jwt鉴权的 控制器/路由 装饰器 */
export const NotJwtAuthGuard = (notJwtAuthGuard='NotJwtAuthGuard') => SetMetadata('NotJwtAuthGuard', notJwtAuthGuard)
