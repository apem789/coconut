import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm'
import { Role } from './role.entity'

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'tinyint', default: 1, comment: '状态：1 正常, 0 软删除' })
  status: number

  @Column({ unique: true, comment: '权限名称' })
  name: string

  @Column({ nullable: true, comment: '注解' })
  decription: string

  // 遵循sql的字段规范
  @Column({ name: 'parent_id', nullable: true, comment: '父级权限的id' })
  parentId: number

  @Column({ default: 300, comment: '权限类型: 100 菜单 200 按钮 300 通用' })
  type: number

  @Column({ comment: '权限对应的路由<正则路由>' })
  path: string

  @Column({ nullable: true, comment: '为菜单权限时,可配置显示的图标名' })
  icon: string

  @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
  createAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateAt: Date

  @ManyToMany(type => Role)
  roles: Promise<Role[]>

}
