import { Controller, Get, UseGuards, Put, Body } from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { EditProfileDto } from './dto';
import { ProfileService } from './profile.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiTags('Profile')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'User Profile' })
  getUserProfile(@GetUser('id') userId: number) {
    return this.profileService.getUserProfile(userId);
  }

  @Put()
  @ApiOperation({ summary: 'Update User Profile' })
  editProfile(@GetUser('id') userId: number, @Body() dto: EditProfileDto) {
    return this.profileService.editProfile(userId, dto);
  }
}
