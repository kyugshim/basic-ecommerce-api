import { EntityRepository, Repository } from 'typeorm';
import { Product } from '../product/product.entity';
import { GetProductFilterDto } from '../product/dto/get_product.dto';
import { AddProductDto } from '../product/dto/add_product.dto';
import { GetProductsPaginationDto } from '../product/dto/get_product_pagination.dto'
import { PaginationResult } from '../product/dto/pagination_result.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { ProductService } from './product.service';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    async getProducts(filterDto: GetProductFilterDto): Promise<Product[]> {
        const { search } = filterDto;
        const query = this.createQueryBuilder('product');

        if (search) {
            query.andWhere('(product.price LIKE :search)', { search: `%${search}%` });
        }

        const products = await query.getMany();
        return products;
    }

    async resultPagination(getProductsPaginationDto: GetProductsPaginationDto): Promise<PaginationResult<Product>> {
        const { search, page, pageSize } = getProductsPaginationDto;
        const query = this.createQueryBuilder('product');

        const count = await query.getCount();
        query.offset((page - 1) * pageSize);
        query.limit(pageSize);

        const products = await query.getMany();

        return {
            data: products,
            pagination: {
                count,
                pageSize,
                page,
            },
        };
    }

    async addProduct(addProductDto: AddProductDto): Promise<Product> {
        const { category, name, price, discount, description, productImage } = addProductDto;

        const product = new Product();
        product.category = category;
        product.name = name;
        product.price = price;
        product.discount = discount;
        product.description = description;
        product.productImage = productImage;

        try {
            await product.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return product;
    }
}