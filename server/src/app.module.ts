import { Module } from '@nestjs/common';
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
      // Hardcoded here to enable easier testing from other machines. All IP addresses have been set to have access, so this should work.
      'mongodb+srv://User1:Test123@cluster0.rir8k73.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [OpenaiController],
  providers: [OpenaiService],
})
export class AppModule {}
