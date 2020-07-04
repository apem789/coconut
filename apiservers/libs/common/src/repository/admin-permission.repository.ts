import { EntityRepository, Repository } from "typeorm";
import { Permission } from "@libs/db/entities/permission.entity";

/** amin-权限操作 */
@EntityRepository(Permission)
export class AdminPermissionRepository extends Repository<Permission> {
  /** 根据用户id查询权限 */
  async getPermissionsByAdminId(id: number): Promise<Permission[]> {
    // 如果你不想每次都去数据库查询,则使用 redis 之类的缓存读取出来的列表
    // redis: user-1-permissions: [xxxx]
    try {
      const sql = 'select permission.id,permission.status,permission.name,permission.parent_id as parentId,permission.type,permission.path,permission.icon from permission left join role_permission on role_permission.permission_id = permission.id left join admin_role on role_permission.role_id = admin_role.role_id where admin_role.admin_id = ?'
      const permissions: Permission[] = await this.query(sql, [id])
      return permissions
    } catch (error) {
      throw error      
    }
  }
}
