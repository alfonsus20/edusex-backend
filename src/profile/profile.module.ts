import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz, QuizAttempt, User } from '../models';

@Module({
  imports: [TypeOrmModule.forFeature([User, QuizAttempt, Quiz])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
