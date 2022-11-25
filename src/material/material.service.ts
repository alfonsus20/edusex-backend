import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from '../models';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private materialsRepository: Repository<Material>,
  ) {}

  async getMaterialById(materialId: string) {
    try {
      const material = await this.materialsRepository.find({
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
}
