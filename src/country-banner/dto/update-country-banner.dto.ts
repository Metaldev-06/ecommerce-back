import { PartialType } from '@nestjs/mapped-types';
import { CreateCountryBannerDto } from './create-country-banner.dto';

export class UpdateCountryBannerDto extends PartialType(CreateCountryBannerDto) {}
