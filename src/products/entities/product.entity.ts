import { Brand } from '@/brands/entities/brand.entity';
import { Category } from '@/categories/entities/category.entity';
import { Country } from '@/countries/entities/country.entity';
import { SubCategory } from '@/sub-categories/entities/sub-category.entity';
import { Exclude } from 'class-transformer';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
  })
  name: string;

  @Column('text', {
    unique: true,
    nullable: false,
  })
  slug: string;

  @Column('numeric', {
    nullable: false,
  })
  price: number;

  @Column('text', {
    nullable: true,
  })
  description: string;

  @Column('text', {
    nullable: true,
  })
  information: string;

  @Column('int', {
    default: 0,
  })
  stock: number;

  @Column('text', {
    nullable: false,
  })
  image: string;

  @ManyToOne(() => Brand, (brand) => brand.products, {
    eager: true,
    onDelete: 'CASCADE',
  })
  brandId: Brand;

  @ManyToOne(() => Category, (category) => category.products, {
    eager: true,
    onDelete: 'CASCADE',
  })
  categoryId: Category;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.products, {
    eager: true,
    onDelete: 'CASCADE',
  })
  subCategoryId: SubCategory;

  @ManyToOne(() => Country, (country) => country.products, {
    eager: true,
    onDelete: 'CASCADE',
  })
  countryId: Country;

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
