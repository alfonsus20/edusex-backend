import { HttpStatus, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from '../enum';
import { User } from '../models';
import { CreatePsikologDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PsikologService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllPsikolog() {
    try {
      const psikologList = await this.userRepository.find({
        where: { role: UserRole.PSIKOLOG },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'success',
        data: psikologList,
      };
    } catch (error) {
      throw error;
    }
  }

  async createPsikologAccount(dto: CreatePsikologDto) {
    try {
      const existingUser = await this.userRepository.findOneBy({
        email: dto.email,
      });

      if (existingUser) {
        throw new BadRequestException('Email sudah digunakan');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.userRepository.save({
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
        role: UserRole.PSIKOLOG,
      });

      delete user.password;

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Akun psikolog berhasil dibuat',
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }
}
