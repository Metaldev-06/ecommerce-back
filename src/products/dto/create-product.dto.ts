import { Brand } from '@/brands/entities/brand.entity';
import { Category } from '@/categories/entities/category.entity';
import { Country } from '@/countries/entities/country.entity';
import { SubCategory } from '@/sub-categories/entities/sub-category.entity';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(25)
  @MinLength(1)
  @Transform(({ value }) => value.trim())
  name: string;

  @IsString()
  @MaxLength(250)
  @Transform(({ value }) => value.trim())
  description: string;

  @IsString()
  @MaxLength(50)
  @MinLength(1)
  @IsOptional()
  @Transform(({ value }) => value.trim())
  information?: string;

  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  price: number;

  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  stock: number;

  @IsNumber()
  // @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  brandId: Brand;

  @IsNumber()
  // @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  categoryId: Category;

  @IsNumber()
  // @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  subCategoryId: SubCategory;

  @IsNumber()
  // @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  countryId: Country;
}
