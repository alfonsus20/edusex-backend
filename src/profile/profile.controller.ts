import { Controller, Get, UseGuards, Put, Body } from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { EditProfileDto } from './dto';
import { ProfileService } from './profile.service';

@UseGuards(JwtGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getUserProfile(@GetUser('id') userId: number) {
    return this.profileService.getUserProfile(userId);
  }

  @Put()
  editProfile(@GetUser('id') userId: number, @Body() dto: EditProfileDto) {
    return this.profileService.editProfile(userId, dto);
  }
}
