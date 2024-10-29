import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateBrandDto, UpdateBrandDto } from './dto';
import { Brand } from './entities/brand.entity';
import { HandleDBExceptions } from '@/common/helpers';
import { PaginationService } from '@/common/services/pagination/pagination.service';
import { PaginationDto } from '@/common/dtos/pagination.dto';

@Injectable()
export class BrandsService {
  private readonly ctxName = 'BrandsService';

  constructor(
    @InjectRepository(Brand)
    private readonly brandsRepository: Repository<Brand>,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    try {
      const brand = this.brandsRepository.create(createBrandDto);
      return await this.brandsRepository.save(brand);
    } catch (error) {
      console.log(error);
      HandleDBExceptions(error, this.ctxName);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset, order, sort, term } = paginationDto;

    return await this.paginationService.paginate(this.brandsRepository, {
      limit,
      offset,
      order,
      sort: sort as keyof Brand,
      where: {
        name: term,
      },
    });
  }

  async findOne(id: number) {
    return this.brandsRepository.findOneBy({ id });
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    try {
      const brand = await this.brandsRepository.preload({
        id,
        ...updateBrandDto,
      });

      if (!brand) throw new Error('Brand not found');

      await this.brandsRepository.save(brand);

      return brand;
    } catch (error) {
      HandleDBExceptions(error, this.ctxName);
    }
  }

  async remove(id: number) {
    const brand = await this.findOne(id);

    if (!brand) throw new NotFoundException('Brand not found');

    await this.brandsRepository.softRemove(brand);
    return {
      message: `Brand ${brand.name} deleted`,
    };
  }
}
