import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Summary } from './summaries.schema';
import { CreateSummaryDto } from './dto/create-summary.dto';

@Injectable()
export class SummariesService {
  constructor(
    @InjectModel(Summary.name) private summaryModel: Model<Summary>,
  ) {}

  async create(createSummaryDto: CreateSummaryDto): Promise<Summary> {
    const createdSummary = new this.summaryModel(createSummaryDto);
    return createdSummary.save();
  }

  async findAll(): Promise<Summary[]> {
    return this.summaryModel.find().exec();
  }
}
