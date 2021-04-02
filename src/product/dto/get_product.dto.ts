import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetProductFilterDto {

    @IsOptional()
    @IsNotEmpty()
    search: string;
}