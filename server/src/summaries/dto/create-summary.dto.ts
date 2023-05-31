import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class CreateSummaryDto {
  @Field()
  originalText: string;
  @Field()
  summary: string;
  @Field(() => [String])
  tags: string[];
  @Field()
  date: string;
}
