import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env']
    })
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
