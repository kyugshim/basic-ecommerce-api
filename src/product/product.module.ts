import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository]),
    AuthModule,
  ],
  controllers: [ProductsController],
  providers: [ProductService]
})
export class ProductsModule { }
