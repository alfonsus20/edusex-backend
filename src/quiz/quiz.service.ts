import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '../models';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
  ) {}

  async getQuizById(userId: number, quizId: string) {
    try {
      const quiz = this.quizRepository.find({
        where: { id: +quizId, attempts: { user: { id: userId } } },
        relations: { attempts: true },
      });

      return { statusCode: HttpStatus.OK, message: 'success', data: quiz };
    } catch (error) {
      throw error;
    }
  }

  async getQuizQuestions(quizId: string) {
    try {
      const quiz = this.quizRepository.find({
        where: { id: +quizId },
        relations: { questions: { options: true } },
      });

      return { statusCode: HttpStatus.OK, message: 'success', data: quiz };
    } catch (error) {
      throw error;
    }
  }
}
