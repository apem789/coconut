import { ApiProperty } from "@nestjs/swagger"

/** admin登录信息 */
export class AdminLoginDto {
  @ApiProperty({ description: '账号', example: 'admin' })
  account: string

  @ApiProperty({ description: '密码', example: 'admin' })
  secret: string
}
