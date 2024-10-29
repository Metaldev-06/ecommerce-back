import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { PaginationDto } from '@/common/dtos/pagination.dto';

@Controller('subcategories')
@UseInterceptors(ClassSerializerInterceptor)
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Post()
  create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.subCategoriesService.create(createSubCategoryDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.subCategoriesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.subCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    return this.subCategoriesService.update(+id, updateSubCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.subCategoriesService.remove(+id);
  }
}
