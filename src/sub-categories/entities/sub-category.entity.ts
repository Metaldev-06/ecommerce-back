import { Category } from '@/categories/entities/category.entity';
import { Product } from '@/products/entities/product.entity';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
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

  @Column('text', {
    nullable: false,
    unique: true,
  })
  slug: string;

  @OneToMany(() => Product, (product) => product.subCategoryId)
  products: Product[];

  @ManyToOne(() => Category, (category) => category.subCategories)
  categoryId: Category;

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
