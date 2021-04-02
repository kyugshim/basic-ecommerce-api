import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';
import { GetProductFilterDto } from './dto/get_product.dto';
import { AddProductDto } from './dto/add_product.dto';
import { PaginationResult } from './dto/pagination_result.dto';
import { GetProductsPaginationDto } from './dto/get_product_pagination.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository,
    ) { }

    async getProducts(filterDto: GetProductFilterDto): Promise<Product[]> {
        return this.productRepository.getProducts(filterDto);
    }

    async resultPagination(getProductsPaginationDto: GetProductsPaginationDto): Promise<PaginationResult<Product>> {
        return this.productRepository.resultPagination(getProductsPaginationDto);
    }

    async getProductById(id: number): Promise<Product> {
        const found = await this.productRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`찾으시는 상품 ID "${id}" 노놉`);
        }
        return found;
    }

    async addProduct(addProductDto: AddProductDto): Promise<Product> {
        return this.productRepository.addProduct(addProductDto);
    }

    async deleteProduct(id: number): Promise<void> {
        const result = await this.productRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`찾으시는 상품 ID "${id}" 노놉`);
        }
    }

    async updateProducts(id: number, addProductDto: AddProductDto): Promise<Product> {
        const { category, name, price, discount, description, productImage } = addProductDto;

        const product = await this.getProductById(id);
        product.category = category;
        product.name = name;
        product.price = price;
        product.discount = discount;
        product.description = description;
        product.productImage = productImage;
        await product.save();
        return product;
    }

}