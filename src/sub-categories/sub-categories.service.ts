import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateSubCategoryDto, UpdateSubCategoryDto } from './dto';
import { HandleDBExceptions } from '@/common/helpers';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { SubCategory } from './entities/sub-category.entity';
import { PaginationService } from '@/common/services/pagination/pagination.service';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoriesRepository: Repository<SubCategory>,

    private readonly paginationService: PaginationService,
  ) {}

  async create(createSubCategoryDto: CreateSubCategoryDto) {
    try {
      const subCategory =
        this.subCategoriesRepository.create(createSubCategoryDto);
      return await this.subCategoriesRepository.save(subCategory);
    } catch (error) {
      HandleDBExceptions(error, this.constructor.name);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset, order, sort, term } = paginationDto;

    return await this.paginationService.paginate(this.subCategoriesRepository, {
      limit,
      offset,
      order,
      sort: sort as keyof SubCategory,
      where: {
        name: term,
      },
    });
  }

  async findOne(id: number) {
    return await this.subCategoriesRepository.findOneBy({ id });
  }

  async update(id: number, updateSubCategoryDto: UpdateSubCategoryDto) {
    try {
      const subCategory = await this.subCategoriesRepository.preload({
        id,
        ...updateSubCategoryDto,
      });

      if (!subCategory) throw new NotFoundException('SubCategory not found');

      await this.subCategoriesRepository.save(subCategory);

      return subCategory;
    } catch (error) {
      HandleDBExceptions(error, this.constructor.name);
    }
  }

  async remove(id: number) {
    const subCategory = await this.findOne(id);

    if (!subCategory) throw new NotFoundException('SubCategory not found');

    await this.subCategoriesRepository.softRemove(subCategory);
    return {
      message: `SubCategory ${subCategory.name} deleted`,
    };
  }
}
