import { Injectable, HttpStatus, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtGuard } from '../auth/guard';
import { Material, Quiz } from '../models';
import { CreateMaterialDto, EditMaterialDto } from './dto';

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

  async getMaterialByIdWithQuiz(materialId: string) {
    try {
      const material = await this.materialsRepository.findOne({
        where: { id: +materialId },
        relations: {
          quiz: { questions: { options: true } },
          topic: true,
        },
        order: {
          quiz: {
            questions: { created_at: 'ASC', options: { created_at: 'ASC' } },
          },
        },
      });
      return { statusCode: HttpStatus.OK, message: 'success', data: material };
    } catch (error) {
      throw error;
    }
  }

  async getAllMaterials() {
    try {
      const materials = await this.materialsRepository.find({
        relations: {
          topic: true,
        },
        order: { updated_at: 'DESC' },
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'success get all materials',
        data: materials,
      };
    } catch (error) {
      throw error;
    }
  }

  async createMaterial(dto: CreateMaterialDto) {
    try {
      const material = await this.materialsRepository.save({
        ...dto,
        quiz: { questions: dto.quiz_questions },
        topic: { id: dto.topic_id },
      });

      return { statusCode: HttpStatus.OK, message: 'success', data: material };
    } catch (error) {
      throw error;
    }
  }

  async deleteMaterial(materialId: string) {
    try {
      const material = await this.materialsRepository.findOne({
        where: { id: +materialId },
        relations: {
          quiz: { questions: { options: true }, attempts: { answers: true } },
        },
      });
      await this.materialsRepository.softRemove(material);
      return {
        statusCode: HttpStatus.OK,
        message: 'success delete',
        data: null,
      };
    } catch (error) {
      throw error;
    }
  }

  async editMaterial(materialId: string, dto: EditMaterialDto) {
    try {
      await this.materialsRepository.save({
        id: +materialId,
        ...dto,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'success edit',
        data: null,
      };
    } catch (error) {
      throw error;
    }
  }
}
