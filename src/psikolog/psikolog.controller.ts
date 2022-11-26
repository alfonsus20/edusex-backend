import { Controller, Body } from '@nestjs/common';
import { Get, Post, UseGuards } from '@nestjs/common/decorators';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { UserRole } from '../enum';
import { CreatePsikologDto } from './dto';
import { PsikologService } from './psikolog.service';

@UseGuards(JwtGuard)
@Controller('psikolog')
export class PsikologController {
  constructor(private readonly psikologService: PsikologService) {}

  @Get()
  getAllPsikolog() {
    return this.psikologService.getAllPsikolog();
  }

  @UseGuards(new RolesGuard(UserRole.ADMIN))
  @Post('create')
  createPsikologAccount(@Body() dto: CreatePsikologDto) {
    return this.psikologService.createPsikologAccount(dto);
  }
}
