import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Admin } from '../entities/admin.entity'

// 集成typeorm的配置构造工厂类
export class DBConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Admin],
      logging: true,
      synchronize: true,
    }
  }
}