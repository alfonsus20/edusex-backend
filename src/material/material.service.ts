import { Injectable, HttpStatus, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtGuard } from '../auth/guard';
import { Material } from '../models';
import { CreateMaterialDto } from './dto';

@UseGuards(JwtGuard)
@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private materialsRepository: Repository<Material>,
  ) {}

  async getMaterialById(materialId: string) {
    try {
      const material = await this.materialsRepository.findOne({
        where: { id: +materialId },
        relations: {
          quiz: true,
        },
      });
      return { statusCode: HttpStatus.OK, message: 'success', data: material };
    } catch (error) {
      throw error;
    }
  }

  async createMaterial(dto: CreateMaterialDto) {
    try {
      const material = await this.materialsRepository.save({
        ...dto,
        quiz: { questions: dto.quiz_questions },
        topic: { id: dto.topicId },
      });

      return { statusCode: HttpStatus.OK, message: 'success', data: material };
    } catch (error) {
      throw error;
    }
  }
}
