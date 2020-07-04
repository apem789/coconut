import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 配置swagger
  const title = process.env.SWAGGER_CMS_TITLE || '文档'
  const description = process.env.SWAGGER_CMS_DESCRIPTION || '接口文档'
  const version = process.env.SWAGGER_CMS_VERSER || '1.0.0'
  const url = process.env.SWAGGER_CMS_URL||'/cms-docs'
  const swaggerOptions = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth()
    .build()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions)
  SwaggerModule.setup(url, app, swaggerDocument)

  const cmsPort = process.env.APP_CMS_API_PORT || 3000
  await app.listen(cmsPort)
  Logger.log('cms-api 运行在端口: ' + cmsPort)
}
bootstrap()
