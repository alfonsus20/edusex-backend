import { Module } from '@nestjs/common';
import { PsikologService } from './psikolog.service';
import { PsikologController } from './psikolog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  controllers: [PsikologController],
  providers: [PsikologService],
})
export class PsikologModule {}
