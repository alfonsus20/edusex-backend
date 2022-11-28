import { Controller, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Post, UseGuards } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../auth/guard';
import { StorageService } from './storage.service';

@UseGuards(JwtGuard)
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.storageService.uploadImage(file);
  }
}
