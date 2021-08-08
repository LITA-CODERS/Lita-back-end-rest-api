import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Categories } from '../../../../categories/infra/typeorm/entities/Categories';

@Entity('food_dishes')
class FoodDishes {
  @PrimaryColumn()
  readonly id: string;

  @ManyToOne(() => Categories)
  @JoinColumn({ name: 'category_id' })
  categories: Categories;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    this.id = this.id ?? uuid();
  }
}

export { FoodDishes };
