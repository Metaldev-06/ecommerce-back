import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';
import { PaginationService } from '../common/services/pagination/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountriesController],
  providers: [CountriesService, PaginationService],
})
export class CountriesModule {}
