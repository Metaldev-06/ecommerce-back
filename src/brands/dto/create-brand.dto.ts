import { Transform } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @MinLength(1)
  @MaxLength(25)
  @Transform(({ value }) => value.trim())
  name: string;
}
