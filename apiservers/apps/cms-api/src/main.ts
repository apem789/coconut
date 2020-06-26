import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const cmsPort = process.env.APP_CMS_API_PORT || 3000
  await app.listen(cmsPort)
  Logger.log('cms-api 运行在端口: ' + cmsPort)
}
bootstrap()
