import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesController } from './sub-categories.controller';
import { PaginationService } from '@/common/services/pagination/pagination.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from './entities/sub-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategory])],
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService, PaginationService],
})
export class SubCategoriesModule {}
