import { Controller, Post, Body } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('summary')
  async generateSummary(@Body() body: { text: string }): Promise<string> {
    const { text } = body;
    console.log(text);
    const summary = await this.openaiService.generateSummary(text);
    return summary;
  }

  @Post('tags')
  async generateTags(@Body() body: { text: string }): Promise<string[]> {
    const { text } = body;
    const tags = await this.openaiService.generateTags(text);
    return tags;
  }
}
