import { Controller, Get } from '@nestjs/common';

@Controller('sample')
export class SampleController {
  @Get()
  getSampleData(): any {
    return [
      {
        id: 1,
        originalText: 'This is the first original text',
        summary: 'This is the first summary',
        date: '2022-09-15',
        tags: ['Tag A', 'Tag B', 'Tag C', 'Tag D', 'Tag E'],
      },
      {
        id: 2,
        originalText: 'Here is a longer original text for the second item',
        summary: 'And this is a more detailed summary for the second item',
        date: '2022-08-20',
        tags: ['Tag B', 'Tag C'],
      },
      {
        id: 3,
        originalText: 'This is an original text with unique content',
        summary: 'A unique summary that describes the third item',
        date: '2022-10-05',
        tags: ['Tag C', 'Tag D'],
      },
      {
        id: 4,
        originalText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        date: '2022-11-01',
        tags: ['Tag D', 'Tag E'],
      },
      {
        id: 5,
        originalText: 'The fifth item has a very distinct original text',
        summary: 'And an equally distinct summary',
        date: '2022-12-15',
        tags: ['Tag E', 'Tag A'],
      },
    ];
  }
}
