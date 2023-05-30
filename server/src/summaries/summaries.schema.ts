import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SummaryDocument = HydratedDocument<Summary>;

@Schema()
export class Summary {
  @Prop()
  originalText: string;

  @Prop()
  summary: string;

  @Prop()
  tags: string[];

  @Prop()
  date: string;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);
