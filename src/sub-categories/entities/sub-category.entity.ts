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

@Entity('sub_categories')
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  name: string;

  @OneToMany(() => Product, (product) => product.subCategoryId)
  products: Product[];

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
