import { Product } from '@/products/entities/product.entity';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  name: string;

  @OneToMany(() => Product, (product) => product.brandId)
  products: Product[];

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
