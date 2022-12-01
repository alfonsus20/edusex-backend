import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../models';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async getAllNotifications(userId: number) {
    try {
      const notifications = await this.notificationRepository.find({
        where: { user: { id: userId } },
        order: { created_at: 'DESC' },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'success get notification',
        data: notifications,
      };
    } catch (error) {
      throw error;
    }
  }

  async readNotification(userId: number, notificationId: string) {
    try {
      await this.notificationRepository.update(
        { user: { id: userId }, id: +notificationId },
        { is_read: true },
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'success read notification',
        data: null,
      };
    } catch (error) {
      throw error;
    }
  }

  async markAllNotificationAsRead(userId: number) {
    try {
      await this.notificationRepository.update(
        { user: { id: userId }, is_read: false },
        { is_read: true },
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'success mark all notifications as read',
        data: null,
      };
    } catch (error) {
      throw error;
    }
  }
}
