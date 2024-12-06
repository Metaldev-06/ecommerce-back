import { Injectable } from '@nestjs/common';
import { CreateCountryBannerDto } from './dto/create-country-banner.dto';
import { UpdateCountryBannerDto } from './dto/update-country-banner.dto';

@Injectable()
export class CountryBannerService {
  create(createCountryBannerDto: CreateCountryBannerDto) {
    return 'This action adds a new countryBanner';
  }

  findAll() {
    return `This action returns all countryBanner`;
  }

  findOne(id: number) {
    return `This action returns a #${id} countryBanner`;
  }

  update(id: number, updateCountryBannerDto: UpdateCountryBannerDto) {
    return `This action updates a #${id} countryBanner`;
  }

  remove(id: number) {
    return `This action removes a #${id} countryBanner`;
  }
}
