import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @Transform(({ value }) => value.trim().toLowerCase())
  name: string;
}
