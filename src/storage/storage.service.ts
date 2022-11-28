import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class StorageService {
  constructor(private configService: ConfigService) {}

  async uploadImage(file: Express.Multer.File) {
    if (!/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.originalname)) {
      throw new BadRequestException('Error file type : Only images allowed');
    }

    try {
      const filePath = `upload/${uuidv4()}-${file.originalname}`.replace(
        /\s+/g,
        '-',
      );

      const supabase = createClient(
        this.configService.get('SUPABASE_URL'),
        this.configService.get('SUPABASE_KEY'),
      );

      await supabase.storage
        .from('images')
        .upload(filePath, file.buffer, { contentType: 'image' });

      return {
        statusCode: HttpStatus.OK,
        message: 'success upload',
        data: `https://qdmpfooxehwcdufdlkhd.supabase.co/storage/v1/object/public/images/${filePath}`,
      };
    } catch (error) {
      throw error;
    }
  }
}
