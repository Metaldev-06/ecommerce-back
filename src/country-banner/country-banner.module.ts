import { Module } from '@nestjs/common';
import { CountryBannerService } from './country-banner.service';
import { CountryBannerController } from './country-banner.controller';

@Module({
  controllers: [CountryBannerController],
  providers: [CountryBannerService],
})
export class CountryBannerModule {}
