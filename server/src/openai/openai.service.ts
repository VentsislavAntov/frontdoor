import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenaiService {
  private readonly apiKey: string =
    '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';

  async generateSummary(text: string): Promise<string> {
    const configuration = new Configuration({
      apiKey: this.apiKey,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Summarize this in no more than 5 words and remove all special characters and new lines: ${text}`,
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const summary = response.data.choices[0].text?.replace(/\n/g, ' ')?.trim();
    console.log('summary in openService', summary);
    return summary;
  }

  async generateTags(text: string): Promise<string[]> {
    const configuration = new Configuration({
      apiKey: this.apiKey,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate a maximum of 5 tags and separate them with commas. Add a # symbol in front of the tag. Remove special characters and new lines: ${text}`,
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const tags = response.data.choices[0]?.text?.trim();
    if (!tags || !tags.length) {
      throw new Error('Tags failed to be generated');
    }
    console.log('tags in openService', tags);
    const tagsArray = tags.split(',');
    let finalTags = tagsArray;
    if (tagsArray.length > 5) {
      finalTags = tagsArray.slice(0, 5);
    }

    return finalTags;
  }
}
