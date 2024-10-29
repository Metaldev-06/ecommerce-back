import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { PaginationService } from '@/common/services/pagination/pagination.service';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { HandleDBExceptions } from '@/common/helpers';
import { isUUID } from 'class-validator';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productsRepository.create(createProductDto);
      return await this.productsRepository.save(product);
    } catch (error) {
      HandleDBExceptions(error, this.constructor.name);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {
      limit,
      offset,
      order,
      sort,
      term,
      category,
      brand,
      country,
      subCategory,
    } = paginationDto;

    const where: FindOptionsWhere<Product> = {};

    if (category) {
      where.categoryId = { name: ILike(`%${category}%`) };
    }
    if (brand) {
      where.brandId = { name: ILike(`%${brand}%`) };
    }
    if (country) {
      where.countryId = { name: ILike(`%${country}%`) };
    }
    if (subCategory) {
      where.subCategoryId = { name: ILike(`%${subCategory}%`) };
    }
    if (term) {
      where.name = ILike(`%${term}%`);
    }

    return await this.paginationService.paginate(this.productsRepository, {
      limit,
      offset,
      order,
      where,
      sort: sort as keyof Product,
    });
  }

  async findOne(term?: string) {
    let product: Product;

    if (isUUID(term)) {
      product = await this.productsRepository.findOneBy({ id: term });
    } else {
      product = await this.productsRepository.findOneBy({ slug: term });
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productsRepository.preload({
        id,
        ...updateProductDto,
      });

      if (!product) throw new NotFoundException('Product not found');

      await this.productsRepository.save(product);

      return product;
    } catch (error) {
      HandleDBExceptions(error, this.constructor.name);
    }
  }

  async remove(id: string) {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) throw new NotFoundException('Product not found');

    await this.productsRepository.softRemove(product);

    return {
      message: `Product ${product.name} deleted`,
    };
  }
}
