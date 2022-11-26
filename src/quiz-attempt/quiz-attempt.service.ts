import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizAttempt } from '../models';

@Injectable()
export class QuizAttemptService {
  constructor(
    @InjectRepository(QuizAttempt)
    private quizAttemptRepository: Repository<QuizAttempt>,
  ) {}

  async getQuizAttemptById(userId: number, attemptId: string) {
    try {
      await this.quizAttemptRepository.findOne({
        where: { id: +attemptId, user: { id: userId } },
        relations: { quiz: { questions: { options: true } } },
      });
    } catch (error) {
      throw error;
    }
  }
}
