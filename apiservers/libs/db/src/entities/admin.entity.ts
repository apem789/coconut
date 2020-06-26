import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: 1, comment: '状态：1 正常, 0 软删除' })
  status: number

  @Column({ unique: true, comment: '账号' })
  account: string

  @Column({ comment: '密码' })
  secret: string

  @Column({ nullable: true, comment: '昵称,插入记录是可为空' })
  nickname: string

  @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
  createAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateAt: Date
}
