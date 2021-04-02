import { createParamDecorator } from '@nestjs/common';
import { Product } from './product.entity';

export const GetProduct = createParamDecorator((data, req): Product => {
    return req.products;
});