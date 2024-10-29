import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Country } from './entities/country.entity';
import { CreateCountryDto, UpdateCountryDto } from './dto';
import { PaginationService } from '@/common/services/pagination/pagination.service';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { HandleDBExceptions } from '@/common/helpers';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countriesRepository: Repository<Country>,

    private readonly paginationService: PaginationService,
  ) {}

  async create(createCountryDto: CreateCountryDto) {
    try {
      const country = this.countriesRepository.create(createCountryDto);
      return await this.countriesRepository.save(country);
    } catch (error) {
      HandleDBExceptions(error, this.constructor.name);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset, order, sort, term } = paginationDto;

    return await this.paginationService.paginate(this.countriesRepository, {
      limit,
      offset,
      order,
      sort: sort as keyof Country,
      where: {
        name: term,
      },
    });
  }

  async findOne(id: number) {
    return await this.countriesRepository.findOneBy({ id });
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    try {
      const country = await this.countriesRepository.preload({
        id,
        ...updateCountryDto,
      });

      if (!country) throw new NotFoundException('Country not found');

      await this.countriesRepository.save(country);

      return country;
    } catch (error) {
      HandleDBExceptions(error, this.constructor.name);
    }
  }

  async remove(id: number) {
    const country = await this.findOne(id);

    if (!country) throw new NotFoundException('Country not found');

    await this.countriesRepository.softRemove(country);

    return {
      message: `Country ${country.name} deleted`,
    };
  }
}
