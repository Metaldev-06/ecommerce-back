import { strict } from 'assert';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CountryBanner {
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
}
