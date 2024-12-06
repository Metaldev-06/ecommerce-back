import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { PaginationService } from '@/common/services/pagination/pagination.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { HandleDBExceptions } from '@/common/helpers';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoriesRepository.create(createCategoryDto);
      return await this.categoriesRepository.save(category);
    } catch (error) {
      HandleDBExceptions(error, this.constructor.name);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset, order, sort, term } = paginationDto;

    return this.paginationService.paginate(this.categoriesRepository, {
      limit,
      offset,
      order,
      sort: sort as keyof Category,
      where: {
        name: term,
      },
      relations: ['subCategories'],
    });
  }

  async findOne(id: number) {
    return await this.categoriesRepository.findOneBy({ id });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoriesRepository.preload({
        id,
        ...updateCategoryDto,
      });

      if (!category) throw new NotFoundException('Category not found');

      await this.categoriesRepository.save(category);

      return category;
    } catch (error) {
      HandleDBExceptions(error, this.constructor.name);
    }
  }

  async remove(id: number) {
    const category = await this.findOne(id);

    if (!category) throw new NotFoundException('Category not found');

    await this.categoriesRepository.softRemove(category);
    return {
      message: `Category ${category.name} deleted`,
    };
  }
}
