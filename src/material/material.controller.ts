import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Delete,
  Put,
} from '@nestjs/common';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { UserRole } from '../enum';
import { CreateMaterialDto, EditMaterialDto } from './dto';
import { MaterialService } from './material.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('material')
@ApiTags('Educational Material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @UseGuards(new RolesGuard(UserRole.ADMIN))
  @Get()
  @ApiOperation({ summary: 'All Materials' })
  getAllMaterials() {
    return this.materialService.getAllMaterials();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Material Detail' })
  getMaterialById(@Param('id') materialId: string) {
    return this.materialService.getMaterialById(materialId);
  }

  @Get(':id/with-quiz')
  @ApiOperation({ summary: 'Material Quiz' })
  @ApiBearerAuth()
  getMaterialByIdWithQuiz(@Param('id') materialId: string) {
    return this.materialService.getMaterialByIdWithQuiz(materialId);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Edit Material' })
  @ApiBearerAuth()
  editMaterial(@Param('id') materialId: string, @Body() dto: EditMaterialDto) {
    return this.materialService.editMaterial(materialId, dto);
  }

  @UseGuards(JwtGuard)
  @UseGuards(new RolesGuard(UserRole.ADMIN))
  @Post('create')
  @ApiOperation({ summary: 'Create New Material' })
  @ApiBearerAuth()
  createMaterial(@Body() dto: CreateMaterialDto) {
    return this.materialService.createMaterial(dto);
  }

  @UseGuards(JwtGuard)
  @UseGuards(new RolesGuard(UserRole.ADMIN))
  @ApiOperation({ summary: 'Delete Material' })
  @ApiBearerAuth()
  @Delete(':id')
  async deleteMaterial(@Param('id') materialId: string) {
    return this.materialService.deleteMaterial(materialId);
  }
}
