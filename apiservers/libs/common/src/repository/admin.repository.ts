import { EntityRepository, Repository } from "typeorm";
import { Admin } from "@libs/db/entities/admin.entity";
import { AdminCreateDto } from "../dto/admin/admin-create.dto";
import { Unauthorized, NotFound } from "../error/exception";
import { AdminLoginDto } from "../dto/admin/admin-login.dto";

/** 这是数据库操作的业务代码,应该根据cms / web 的不同来分配到不同的应用中的 */
/** Admin数据模型操作 */
@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  /** 新建管理员 */
  async createNewAdmin(adminCreateDto: AdminCreateDto) {
    // 先查再操作
    const { account, secret, nickname } = adminCreateDto

    const hasRegister = await this.findOne({ account })
    if(hasRegister) {
      throw new Unauthorized('账号已被注册', 4010001)
    }

    try {
      const admin = new Admin()
      // 密码记得sha加密
      admin.account = account
      admin.secret = secret
      admin.nickname = nickname
      
      await this.save(admin)
    } catch (error) {
     throw error 
    }
  }

  /** 根据账号密码查询admin用户 */
  async getAdminByAccountAndSecret(adminLoginDto: AdminLoginDto): Promise<Admin> {
    const { account, secret } = adminLoginDto
    try {
      const admin = await this.findOne({ account })
      if(!admin) {
        throw new Unauthorized('账号或密码错误')
      }

      //根据加密情况来比对密码是否一致
      if(admin.secret !== secret) {
        throw new Unauthorized('账号或密码错误')
      }
      
      return admin
    } catch (error) {
      throw error
    }
  }

  /** 根据id查admin用户 */
  async getAdminByAdminId(id: number): Promise<Admin> {
    try {
      const admin = await this.findOne({ id })
      if(!admin) {
        throw new NotFound('用户不存在')
      }
      return admin
    } catch (error) {
      throw error
    }
  }
}
