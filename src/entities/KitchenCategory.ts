import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { KitchenItem } from './KitchenItem';

@Entity()
export class KitchenCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => KitchenItem, item => item.category)
  items!: KitchenItem[];
}
