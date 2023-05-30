import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SummariesResolver } from './summaries.resolver';
import { SummariesService } from './summaries.service';
import { Summary, SummarySchema } from './summaries.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Summary.name, schema: SummarySchema }]),
  ],
  providers: [SummariesResolver, SummariesService],
})
export class SummariesModule {}
