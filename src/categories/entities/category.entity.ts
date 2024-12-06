import { Product } from '@/products/entities/product.entity';
import { SubCategory } from '@/sub-categories/entities/sub-category.entity';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  name: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  slug: string;

  @OneToMany(() => Product, (product) => product.categoryId)
  products: Product[];

  @OneToMany(() => SubCategory, (subCategory) => subCategory.categoryId)
  subCategories: SubCategory[];

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  checkSlug() {
    if (!this.slug) {
      this.slug = this.slugify(this.name);
    }

    this.slug = this.slugify(this.slug);
  }

  @BeforeUpdate()
  updateSlug() {
    this.slug = this.slugify(this.slug);
  }

  slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD') // Descompone los caracteres Unicode (e.g., é => e + ́)
      .replace(/[\u0300-\u036f]/g, '') // Elimina los acentos o marcas diacríticas
      .replace(/[^a-z0-9\s-]/g, '') // Elimina caracteres no deseados excepto letras, números, espacios y guiones
      .replace(/\s+/g, '-') // Reemplaza los espacios por guiones
      .replace(/-+/g, '-') // Reemplaza múltiples guiones por uno solo
      .replace(/^-+|-+$/g, ''); // Elimina los guiones al inicio y final
  }
}
