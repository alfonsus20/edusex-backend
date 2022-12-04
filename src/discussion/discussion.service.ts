import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationType, UserRole } from '../enum';
import {
  DiscussionQuestion,
  DiscussionQuestionReply,
  Notification,
  User,
} from '../models';
import { PusherService } from '../pusher/pusher.service';
import { CreateDiscussionQuestionDto, ReplyDiscussionQuestionDto } from './dto';

@Injectable()
export class DiscussionService {
  constructor(
    @InjectRepository(DiscussionQuestion)
    private discussionQuestionRepository: Repository<DiscussionQuestion>,
    @InjectRepository(DiscussionQuestionReply)
    private discussionQuestionReplyRepository: Repository<DiscussionQuestionReply>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private pusherService: PusherService,
  ) {}

  async createQuestion(userId: number, dto: CreateDiscussionQuestionDto) {
    try {
      const question = await this.discussionQuestionRepository.save({
        question: dto.question,
        user: { id: userId },
        topic: { id: dto.topic_id },
      });

      return { statusCode: HttpStatus.OK, message: 'success', data: question };
    } catch (error) {
      throw error;
    }
  }

  async replyQuestion(
    user: User,
    questionId: string,
    dto: ReplyDiscussionQuestionDto,
  ) {
    try {
      const question = await this.discussionQuestionRepository.findOne({
        where: { id: +questionId },
        relations: { user: true },
      });

      const reply = await this.discussionQuestionReplyRepository.save({
        user: { id: user.id },
        question: { id: +questionId },
        reply: dto.reply,
      });

      if (user.id !== question.user.id) {
        const notification = await this.notificationRepository.save({
          content: `Pertanyaan kamu "${question.question}" telah dijawab oleh ${
            user.role === UserRole.PSIKOLOG ? 'Psikolog' : ''
          } ${user.name}.`,
          user: { id: question.user.id },
          type: NotificationType.DISCUSSION_FORUM,
        });
        await this.pusherService.trigger(
          `user-${question.user.id}`,
          'notification-received',
          notification,
        );
      }

      return { statusCode: HttpStatus.OK, message: 'success', data: reply };
    } catch (error) {
      throw error;
    }
  }

  async getAllQuestions() {
    try {
      const questions = await this.discussionQuestionRepository.find({
        relations: { replies: { user: true }, user: true, topic: true },
        order: { created_at: 'DESC' },
      });

      return { statusCode: HttpStatus.OK, message: 'success', data: questions };
    } catch (error) {
      throw error;
    }
  }

  async getQuestionById(questionId: string) {
    try {
      const question = await this.discussionQuestionRepository.findOne({
        relations: { replies: { user: true }, user: true },
        where: { id: +questionId },
      });

      return { statusCode: HttpStatus.OK, message: 'success', data: question };
    } catch (error) {
      throw error;
    }
  }

  async getUserQuestions(userId: number) {
    try {
      const question = await this.discussionQuestionRepository.find({
        where: { user: { id: userId } },
        relations: { replies: { user: true }, user: true },
        order: { created_at: 'DESC' },
      });

      return { statusCode: HttpStatus.OK, message: 'success', data: question };
    } catch (error) {
      throw error;
    }
  }
}
