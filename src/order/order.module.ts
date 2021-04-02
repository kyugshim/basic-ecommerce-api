
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { OrderRepository } from './order.repository';
import { OrdersService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository]),
    AuthModule,
  ],
  controllers: [OrderController],
  providers: [OrdersService],
})
export class OrdersModule { }