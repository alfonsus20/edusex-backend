import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
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
      const attempt = await this.quizAttemptRepository.findOne({
        where: { id: +attemptId, user: { id: userId } },
        relations: {
          answers: { question: { options: true }, option: true },
          quiz: true,
        },
      });

      return { statusCode: HttpStatus.OK, message: 'success', data: attempt };
    } catch (error) {
      throw error;
    }
  }
}
