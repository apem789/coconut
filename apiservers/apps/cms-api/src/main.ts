import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 配置swagger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('cms-api 接口文档')
    .setDescription('cms接口文档')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions)
  SwaggerModule.setup('/cms-doc', app, swaggerDocument)

  const cmsPort = process.env.APP_CMS_API_PORT || 3000
  await app.listen(cmsPort)
  Logger.log('cms-api 运行在端口: ' + cmsPort)
}
bootstrap()
