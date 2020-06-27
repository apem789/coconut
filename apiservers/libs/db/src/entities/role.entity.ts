import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm'
import { Admin } from './admin.entity'
import { Permission } from './permission.entity'

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'tinyint', default: 1, comment: '状态：1 正常, 0 软删除' })
  status: number

  @Column({ unique: true, comment: '角色名称,唯一' })
  name: string

  @Column({ nullable: true, comment: '注解' })
  description: string

  @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
  createAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateAt: Date

  @ManyToMany(type => Admin)
  admins: Promise<Admin[]>

  @ManyToMany(type => Permission)
  @JoinTable({
    name: 'role_permission',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id'
    }
  })
  permissions: Promise<Permission[]>

}
