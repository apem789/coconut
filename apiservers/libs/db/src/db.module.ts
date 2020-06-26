import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfigService } from './config/db.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DBConfigService
    })
  ],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
