import { IsNotEmpty } from 'class-validator';

export class AddProductDto {

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    discount: number;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    productImage: string;
}