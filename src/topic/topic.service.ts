import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizAttemptStatus } from '../enum';
import { Material, Topic } from '../models';

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

  async getTopicById(topicId: string) {
    try {
      const topic = await this.topicsRepository.findOne({
        where: { id: +topicId },
        relations: { materials: true },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'success',
        data: topic,
      };
    } catch (error) {
      throw error;
    }
  }

  async getTopicsWithProgress(userId: number) {
    try {
      const topics = await this.topicsRepository.find({
        where: {
          materials: {
            quiz: {
              attempts: {
                user: { id: userId },
                status: QuizAttemptStatus.SUCCESS,
              },
            },
          },
        },
        relations: { materials: true },
      });

      const temp = topics.reduce(
        (prev, topic) => ({ ...prev, [topic.id]: topic.materials.length }),
        {},
      );

      const allTopics = await this.topicsRepository
        .createQueryBuilder('topic')
        .loadRelationCountAndMap(
          'topic.total_material',
          'topic.materials',
          'material',
        )
        .getMany();

      const modified = allTopics.map((topic) => ({
        ...topic,
        finished_material: temp[topic.id] || 0,
      }));

      return { statusCode: HttpStatus.OK, message: 'success', data: modified };
    } catch (error) {
      throw error;
    }
  }
}
