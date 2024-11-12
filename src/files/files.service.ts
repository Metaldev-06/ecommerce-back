import { Injectable, NotFoundException } from '@nestjs/common';

import { CloudinaryResponse } from '@/cloudinary';
import { v2 as cloudinary } from 'cloudinary';

import * as streamifier from 'streamifier';
import { Product } from '@/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '@/images/entities/image.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    const filePath = new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });

    return await filePath;
  }

  async addImageToProduct(productId: string, file: Express.Multer.File) {
    const product = await this.productsRepository.findOneBy({ id: productId });

    if (!product) throw new NotFoundException('Product not found');

    const uploadedImage = await this.uploadFile(file);

    const image = this.imagesRepository.create({
      imageUrl: uploadedImage.secure_url,
      product,
    });

    await this.imagesRepository.save(image);

    return image;
  }
}
