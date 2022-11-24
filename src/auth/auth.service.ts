import {
  ForbiddenException,
  Injectable,
  HttpStatus,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.model';
import { LoginDto, RegisterDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    try {
      const user = await this.usersRepository.findOneBy({
        email: dto.email,
      });

      if (!user) {
        throw new ForbiddenException('Email tidak ditemukan');
      }

      const isPasswordCorrect = await bcrypt.compare(
        dto.password,
        user.password,
      );

      if (!isPasswordCorrect) {
        throw new ForbiddenException('Password salah');
      }

      const token = await this.signToken(user.id, user.email);

      delete user.password;

      return {
        statusCode: HttpStatus.OK,
        data: { user, token },
      };
    } catch (error) {
      throw error;
    }
  }

  async register(dto: RegisterDto) {
    try {
      const existingUser = await this.usersRepository.findOneBy({
        email: dto.email,
      });

      if (existingUser) {
        throw new BadRequestException('Email sudah digunakan');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.usersRepository.save({
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
      });

      delete user.password;

      const token = await this.signToken(user.id, user.email);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Pendaftaran akun berhasil',
        data: { user, token },
      };
    } catch (error) {
      throw error;
    }
  }

  async signToken(userId: number, email: string) {
    const token = await this.jwt.signAsync(
      { sub: userId, email },
      { expiresIn: '60d', secret: this.config.get('JWT_SECRET') },
    );

    return token;
  }
}
