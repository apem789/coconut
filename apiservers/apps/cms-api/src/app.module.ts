import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '@libs/common';
import { DbModule } from '@libs/db';

@Module({
  imports: [
    CommonModule,
    DbModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
