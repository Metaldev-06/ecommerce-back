import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @Transform(({ value }) => value.trim().toLowerCase())
  name: string;
}
