import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from '../models';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic) private topicsRepository: Repository<Topic>,
  ) {}

  async getTopics() {
    try {
      const topics = await this.topicsRepository.find();

      return { statusCode: HttpStatus.OK, message: 'success', data: topics };
    } catch (error) {
      throw error;
    }
  }

  async getTopicsWithProgress() {
    try {
      const topics = await this.topicsRepository.find();

      return { statusCode: HttpStatus.OK, message: 'success', data: topics };
    } catch (error) {
      throw error;
    }
  }
}
