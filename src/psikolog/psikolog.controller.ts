import { Controller, Body } from '@nestjs/common';
import { Get, Post, UseGuards } from '@nestjs/common/decorators';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { UserRole } from '../enum';
import { CreatePsikologDto } from './dto';
import { PsikologService } from './psikolog.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiTags('Psychologist Management')
@Controller('psikolog')
@ApiBearerAuth()
export class PsikologController {
  constructor(private readonly psikologService: PsikologService) {}

  @Get()
  @ApiOperation({ summary: 'Psychologist List' })
  getAllPsikolog() {
    return this.psikologService.getAllPsikolog();
  }

  @UseGuards(new RolesGuard(UserRole.ADMIN))
  @Post('create')
  @ApiOperation({ summary: 'Create Psychologist Account' })
  createPsikologAccount(@Body() dto: CreatePsikologDto) {
    return this.psikologService.createPsikologAccount(dto);
  }
}
