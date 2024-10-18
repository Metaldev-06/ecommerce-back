import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { HandleDBExceptions } from '@/common/helpers';

@Injectable()
export class BrandsService {
  private readonly ctxName = 'BrandsService';

  constructor(
    @InjectRepository(Brand)
    private readonly brandsRepository: Repository<Brand>,
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

  async findAll() {
    return await this.brandsRepository.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
