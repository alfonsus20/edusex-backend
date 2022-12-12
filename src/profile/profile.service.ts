import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isURL } from 'class-validator';
import { Repository } from 'typeorm';
import { QuizAttemptStatus, UserRole } from '../enum';
import { Quiz, User } from '../models';
import { EditProfileDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
  ) {}

  async getUserProfile(userId: number) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });

      delete user.password;

      let returnedData: Record<string, any> = { ...user };

      if (user.role === UserRole.USER) {
        const passedQuiz = await this.quizRepository.find({
          where: {
            attempts: {
              user: { id: userId },
              status: QuizAttemptStatus.SUCCESS,
            },
          },
          relations: { attempts: { quiz: true } },
        });

        const passedQuizIds = new Set<number>(
          passedQuiz.map((quiz) => quiz.id),
        );

        const [, totalQuiz] = await this.quizRepository.findAndCount();

        returnedData = {
          ...returnedData,
          progress: { passed_quiz: passedQuizIds.size, total_quiz: totalQuiz },
        };
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'success',
        data: returnedData,
      };
    } catch (error) {
      throw error;
    }
  }

  async editProfile(userId: number, dto: EditProfileDto) {
    try {
      if (
        dto.avatar_url !== undefined &&
        dto.avatar_url !== '' &&
        !isURL(dto.avatar_url)
      ) {
        throw new BadRequestException('avatar_url must be a url');
      }

      const updateInfo = await this.userRepository.update({ id: userId }, dto);

      return {
        statusCode: HttpStatus.OK,
        message: 'success',
        data: updateInfo,
      };
    } catch (error) {
      throw error;
    }
  }
}
