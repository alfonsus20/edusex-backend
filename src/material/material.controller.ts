import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { MaterialService } from './material.service';

@UseGuards(JwtGuard)
@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Get(':id')
  getMaterialById(@Param('id') materialId: string) {
    return this.materialService.getMaterialById(materialId);
  }
}
