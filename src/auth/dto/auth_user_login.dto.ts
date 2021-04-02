import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthUserLogInDto {
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    password: string;
}