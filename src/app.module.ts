import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
