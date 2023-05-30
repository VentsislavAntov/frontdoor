import {
  Resolver,
  Query,
  Mutation,
  Args,
  ObjectType,
  Field,
  InputType,
  ID,
} from '@nestjs/graphql';
import { SummariesService } from './summaries.service';

@ObjectType()
export class SummaryOutput {
  @Field()
  id: string;

  @Field(() => ID)
  readonly originalText: string;

  @Field()
  readonly summary: string;

  @Field(() => [String])
  readonly tags: string[];

  @Field()
  readonly date: string;
}

@InputType()
export class SummaryInput {
  @Field()
  readonly originalText: string;
  @Field()
  readonly summary: string;
  @Field(() => [String])
  readonly tags: string[];
  @Field()
  readonly date: string;
}

@Resolver()
export class SummariesResolver {
  constructor(private readonly summariesService: SummariesService) {}

  @Query(() => [SummaryOutput])
  async summaries(): Promise<any> {
    return this.summariesService.findAll();
  }

  @Mutation(() => SummaryOutput)
  async createSummary(@Args('input') input: SummaryInput) {
    return this.summariesService.create(input);
  }
}
