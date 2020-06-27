import { Injectable } from '@nestjs/common';
import { AdminCreateDto } from '@libs/common/dto/admin/admin-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from '@libs/common/repository/admin.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminRepository)
    private readonly adminRepository: AdminRepository
  ) {}

  /** 注册新管理员 */
  async register(adminCreateDto: AdminCreateDto): Promise<{ msg: string}> {
    // 注册新admin账号的逻辑
    await this.adminRepository.createNewAdmin(adminCreateDto)
    return {
      msg: '注册成功'
    }
  }
}
