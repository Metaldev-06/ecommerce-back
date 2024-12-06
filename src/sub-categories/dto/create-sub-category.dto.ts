import { Category } from '@/categories/entities/category.entity';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateSubCategoryDto {
  @IsString()
  @MinLength(1)
  @MaxLength(25)
  @IsNotEmpty()
  @Transform(({ value }) => value.trim().toLowerCase())
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  categoryId: Category;
}
