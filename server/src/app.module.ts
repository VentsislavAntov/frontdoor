import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseController } from './database/database.controller';
import { OpenaiController } from './openai/openai.controller';
import { OpenaiService } from './openai/OpenService';

@Module({
  imports: [],
  controllers: [AppController, DatabaseController, OpenaiController],
  providers: [AppService, OpenaiService],
})
export class AppModule {}
