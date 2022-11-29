import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { UserRole } from '../enum';
import { CreateMaterialDto } from './dto';
import { MaterialService } from './material.service';

@UseGuards(JwtGuard)
@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @UseGuards(new RolesGuard(UserRole.ADMIN))
  @Get()
  getAllMaterials() {
    return this.materialService.getAllMaterials();
  }

  @Get(':id')
  getMaterialById(@Param('id') materialId: string) {
    return this.materialService.getMaterialById(materialId);
  }

  @UseGuards(new RolesGuard(UserRole.ADMIN))
  @Post('create')
  createMaterial(@Body() dto: CreateMaterialDto) {
    return this.materialService.createMaterial(dto);
  }

  @UseGuards(new RolesGuard(UserRole.ADMIN))
  @Delete(':id')
  async deleteMaterial(@Param('id') materialId: string) {
    return this.materialService.deleteMaterial(materialId);
  }
}
