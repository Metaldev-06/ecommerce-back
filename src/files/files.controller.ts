import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/file-filter.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { fileFilter }))
  upliadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    return this.filesService.uploadFile(file);
  }

  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file', { fileFilter }))
  async uploadImageToProduct(
    @Param('id', ParseUUIDPipe) productId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Please upload a valid image file');
    }

    const image = await this.filesService.addImageToProduct(productId, file);
    return {
      message: 'Image uploaded successfully',
      image,
    };
  }
}
