import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { ProfileService } from './profile.service';

@UseGuards(JwtGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getUserProfile(@GetUser('id') userId: number) {
    return this.profileService.getUserProfile(userId);
  }
}
