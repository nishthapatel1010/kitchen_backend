import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Level } from './Level';
import { KitchenCategory } from './KitchenCategory';
import { Admin } from './Admin';

@Entity()
export class KitchenItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Level, level => level.items, { eager: true })
  level!: Level;

  @ManyToOne(() => KitchenCategory, cat => cat.items,{ eager: true })
  category!: KitchenCategory;

  @ManyToOne(() => Admin, admin => admin.items,{ eager: true })
  admin!: Admin;
}
