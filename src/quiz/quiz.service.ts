import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizAttemptStatus } from '../enum';
import { Quiz, QuizAttempt, QuizAttemptAnswer } from '../models';
import { SubmitQuizDto } from './dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
    @InjectRepository(QuizAttempt)
    private quizAttemptRepository: Repository<QuizAttempt>,
    @InjectRepository(QuizAttemptAnswer)
    private quizAttemptAnswerRepository: Repository<QuizAttemptAnswer>,
  ) {}

  async getQuizById(userId: number, quizId: string) {
    try {
      const quiz = await this.quizRepository
        .createQueryBuilder('quiz')
        .loadRelationCountAndMap('quiz.questions', 'quiz.questions')
        .where('quiz.id = :quizId', { quizId: +quizId })
        .leftJoinAndSelect('quiz.material', 'material')
        .getOne();

      const quizAttempts = await this.quizAttemptRepository.find({
        where: { user: { id: userId }, quiz: { id: +quizId } },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'success',
        data: { ...quiz, attempts: quizAttempts },
      };
    } catch (error) {
      throw error;
    }
  }

  async getQuizQuestions(quizId: string) {
    try {
      const quiz = await this.quizRepository.findOne({
        where: { id: +quizId },
        relations: { questions: { options: true } },
      });

      return { statusCode: HttpStatus.OK, message: 'success', data: quiz };
    } catch (error) {
      throw error;
    }
  }

  async submitQuizQuestions(
    userId: number,
    quizId: string,
    answers: SubmitQuizDto,
  ) {
    try {
      const quiz = await this.quizRepository.findOne({
        where: { id: +quizId },
        relations: { questions: { options: true } },
      });

      const answerKey = quiz.questions.reduce(
        (prev, question) => ({
          ...prev,
          [question.id]: question.options.find((option) => option.is_true).id,
        }),
        {},
      );

      const userAnswer = answers.answers.reduce(
        (prev, answer) => ({ ...prev, [answer.question_id]: answer.option_id }),
        {},
      );

      const totalScore =
        (Object.keys(answerKey).reduce(
          (prev, questionId) =>
            prev + (answerKey[questionId] === userAnswer[questionId] ? 1 : 0),
          0,
        ) *
          100) /
        quiz.questions.length;

      const status =
        totalScore > quiz.min_score
          ? QuizAttemptStatus.SUCCESS
          : QuizAttemptStatus.FAILED;

      const quizAttempt = await this.quizAttemptRepository.save({
        score: Math.round(totalScore),
        user: { id: userId },
        quiz: { id: +quizId },
        status,
        answers: answers.answers.map((answer) => ({
          question: { id: answer.question_id },
          option: { id: answer.option_id },
        })),
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'success',
        data: quizAttempt,
      };
    } catch (error) {
      throw error;
    }
  }
}
