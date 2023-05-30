import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { OpenaiController } from './openai/openai.controller';
import { OpenaiService } from './openai/openai.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SummariesModule } from './summaries/summaries.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    SummariesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot(
      'mongodb+srv://User1:Test123@cluster0.rir8k73.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController, OpenaiController],
  providers: [AppService, OpenaiService],
})
export class AppModule {}
