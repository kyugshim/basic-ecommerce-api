import {
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BaseEntity
} from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Order } from '../order/order.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Order, order => order.user, { eager: true })
    orders: Order[];

    async validatePassword(passowrd: string): Promise<boolean> {
        const hash = await bcrypt.hash(passowrd, this.salt);
        return hash === this.password;
    }


}
