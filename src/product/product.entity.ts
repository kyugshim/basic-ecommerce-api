import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    discount: number;

    @Column()
    description: string;

    @Column()
    productImage: string;


}