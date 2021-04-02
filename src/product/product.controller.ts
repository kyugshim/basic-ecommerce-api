import { Body, Controller, Delete, Get, Param, Patch, ParseIntPipe, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { GetProductFilterDto } from './dto/get_product.dto';
import { Product } from './product.entity';
import { AddProductDto } from './dto/add_product.dto';
import { PaginationResult } from './dto/pagination_result.dto';
import { GetProductsPaginationDto } from './dto/get_product_pagination.dto';
import { AuthGuard } from '@nestjs/passport';
// import { AuthGuard } from '@nestjs/jwt';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
    constructor(private productService: ProductService) { }


    @Get()
    getProducts(
        @Query(ValidationPipe) filterDto: GetProductFilterDto): Promise<Product[]> {
        return this.productService.getProducts(filterDto);
    }

    @Get('pagination')
    getPaginationResult(
        @Query(new ValidationPipe({ transform: true })) getProductsPaginationDto: GetProductsPaginationDto): Promise<PaginationResult<Product>> {
        return this.productService.resultPagination(getProductsPaginationDto);
    }

    @Get('/:id')
    getProductsById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productService.getProductById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    addProduct(
        @Body() addProductDto: AddProductDto): Promise<Product> {
        return this.productService.addProduct(addProductDto);
    }

    @Delete('/:id')
    deleteProduct(
        @Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.productService.deleteProduct(id);
    }

    @Patch('/:id')
    updateProduct(
        @Param('id, ParseInPipe') id: number,
        @Body() addProductDto: AddProductDto): Promise<Product> {
        return this.productService.updateProducts(id, addProductDto);
    }

}