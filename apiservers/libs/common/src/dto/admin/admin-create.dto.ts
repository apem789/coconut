import { ApiProperty } from "@nestjs/swagger"


/** 新建admin账号需要的参数 */
export class AdminCreateDto {
  @ApiProperty({ description: '账号', example: 'admin' })
  account: string

  @ApiProperty({ description: '密码', example: 'admin' })
  secret: string

  @ApiProperty({required: false, description: '昵称', example: '我要做管理员' })
  nickname: string
}