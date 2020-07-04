import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminPermissionRepository } from '../repository/admin-permission.repository';
import { Forbidden } from '../error/exception';

/** 针对 CMS rbac 接口权限拦截器 */
export class CMSRBACInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(AdminPermissionRepository)
    private readonly adminPermissionRepository: AdminPermissionRepository
  ) {}
  
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    // 应该是 只要查看请求参数是否解析出user即可判断接口是否需要令牌才能访问
    // 终于能正常读取到了
    // 
    const admin = context.switchToHttp().getRequest().user
    if(admin) {
      const permissions = await this.adminPermissionRepository.getPermissionsByAdminId(admin.id)
      console.log('用户的权限列表：', permissions)
      // 当前请求的path
      const currentPath = context.switchToHttp().getRequest().path
      // 这里得根据具体的路由正则来做判断才准确。明天再写了
      if(!permissions.includes(currentPath)) {
        // 当前url接口不在用户的权限列表中
        throw new Forbidden('权限不足,无法访问')
      }
    }

    return next.handle().pipe()
  }
}
