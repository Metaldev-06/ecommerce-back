import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  Query,
  ParseIntPipe,
} from '@nestjs/common';

import { BrandsService } from './brands.service';
import { CreateBrandDto, UpdateBrandDto } from './dto';
import { PaginationDto } from '@/common/dtos/pagination.dto';

@Controller('brands')
@UseInterceptors(ClassSerializerInterceptor)
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.brandsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.brandsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandsService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.brandsService.remove(+id);
  }
}
