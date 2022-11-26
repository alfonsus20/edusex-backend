import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscussionQuestion, DiscussionQuestionReply } from '../models';
import { CreateDiscussionQuestionDto, ReplyDiscussionQuestionDto } from './dto';

@Injectable()
export class DiscussionService {
  constructor(
    @InjectRepository(DiscussionQuestion)
    private discussionQuestionRepository: Repository<DiscussionQuestion>,
    @InjectRepository(DiscussionQuestionReply)
    private discussionQuestionReplyRepository: Repository<DiscussionQuestionReply>,
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
    userId: number,
    questionId: string,
    dto: ReplyDiscussionQuestionDto,
  ) {
    try {
      const reply = await this.discussionQuestionReplyRepository.save({
        user: { id: userId },
        question: { id: +questionId },
        reply: dto.reply,
      });

      return { statusCode: HttpStatus.OK, message: 'success', data: reply };
    } catch (error) {
      throw error;
    }
  }

  async getAllQuestions() {
    try {
      const questions = await this.discussionQuestionRepository.find({
        relations: { replies: { user: true } },
        select: {
          replies: { reply: true, user: { id: true, name: true, role: true } },
        },
      });

      return { statusCode: HttpStatus.OK, message: 'success', data: questions };
    } catch (error) {
      throw error;
    }
  }

  async getQuestionById(questionId: string) {
    try {
      const question = await this.discussionQuestionRepository.findOne({
        relations: { replies: { user: true } },
        where: { id: +questionId },
        select: {
          replies: { reply: true, user: { id: true, name: true, role: true } },
        },
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
        relations: { replies: { user: true } },
        select: {
          replies: { reply: true, user: { id: true, name: true, role: true } },
        },
      });

      return { statusCode: HttpStatus.OK, message: 'success', data: question };
    } catch (error) {
      throw error;
    }
  }
}
