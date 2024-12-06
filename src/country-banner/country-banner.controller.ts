import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CountryBannerService } from './country-banner.service';
import { CreateCountryBannerDto } from './dto/create-country-banner.dto';
import { UpdateCountryBannerDto } from './dto/update-country-banner.dto';

@Controller('country-banner')
export class CountryBannerController {
  constructor(private readonly countryBannerService: CountryBannerService) {}

  @Post()
  create(@Body() createCountryBannerDto: CreateCountryBannerDto) {
    return this.countryBannerService.create(createCountryBannerDto);
  }

  @Get()
  findAll() {
    return this.countryBannerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryBannerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCountryBannerDto: UpdateCountryBannerDto) {
    return this.countryBannerService.update(+id, updateCountryBannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryBannerService.remove(+id);
  }
}
