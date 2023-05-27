import { Controller, Get } from '@nestjs/common';

@Controller('sample')
export class SampleController {
  @Get()
  getSampleData(): string {
    return 'Hello from the sample endpoint!';
  }
}
