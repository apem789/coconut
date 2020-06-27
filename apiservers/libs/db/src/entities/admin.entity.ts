import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm'
import { Role } from './role.entity'

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'tinyint', default: 1, comment: '状态：1 正常, 0 软删除' })
  status: number

  @Column({ nullable: true, comment: '昵称,插入记录是可为空' })
  nickname: string

  @Column({ unique: true, comment: '账号' })
  account: string

  @Column({ comment: '密码' })
  secret: string

  @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
  createAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateAt: Date

  @ManyToMany(type => Role)
  @JoinTable({
    name: 'admin_role',
    joinColumn: {
      name: 'admin_id', referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'role_id', referencedColumnName: 'id'
    }
  })
  roles: Promise<Role[]>
}
