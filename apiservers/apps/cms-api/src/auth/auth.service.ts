import { Injectable } from '@nestjs/common';
import { AdminCreateDto } from '@libs/common/dto/admin/admin-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from '@libs/common/repository/admin.repository';
import { AdminLoginDto } from '@libs/common/dto/admin/admin-login.dto';
import { Admin } from '@libs/db/entities/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminRepository)
    private readonly adminRepository: AdminRepository,
    private readonly jwtService: JwtService
  ) {}

  /** 注册新管理员 */
  async register(adminCreateDto: AdminCreateDto): Promise<{ msg: string}> {
    // 注册新admin账号的逻辑
    await this.adminRepository.createNewAdmin(adminCreateDto)
    return {
      msg: '注册成功'
    }
  }

  /** 管理员登录处理逻辑 */
  async login(currentAdmin: Admin) {
    // 用户token
    const payload: JwtPayloadInterface = { id: currentAdmin.id }
    const token = await this.generalTokenByPayload(payload)

    // 用户基本信息
    const info = {
      name: currentAdmin.nickname,
      roles: []
    }

    // 用户拥有的权限
    const permissions = []

    // 用户可以访问的菜单
    const menu = []
    
    return {
      token,
      info,
      menu,
      permissions
    }
  }

  /** 根据账号密码查询admin用户 */
  async getAdminByAccountAndSecret(adminLoginDto: AdminLoginDto): Promise<Admin> {
    const admin = await this.adminRepository.getAdminByAccountAndSecret(adminLoginDto)
    return admin
  }

  /** 根据id查用户 */
  async getAdminByAdminId(id: number) {
    const admin = await this.adminRepository.getAdminByAdminId(id)
    return admin
  }

  /** 生成jwt令牌 */
  async generalTokenByPayload(jwtPayloadInterface: JwtPayloadInterface):Promise<string> {
    const token = await this.jwtService.signAsync(jwtPayloadInterface)
    return token
  }
}
