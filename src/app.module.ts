import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { CountriesModule } from './countries/countries.module';
import { ImagesModule } from './images/images.module';
import { FilesModule } from './files/files.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { CountryBannerModule } from './country-banner/country-banner.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: true,
      autoLoadEntities: true,
    }),
    ProductsModule,
    CategoriesModule,
    BrandsModule,
    ReviewsModule,
    CustomersModule,
    OrdersModule,
    SubCategoriesModule,
    CountriesModule,
    ImagesModule,
    FilesModule,
    CloudinaryModule,
    ShoppingCartModule,
    CountryBannerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
