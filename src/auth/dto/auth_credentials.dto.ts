import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class AuthCredentialsDto {
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    username: string;

    @IsEmail()
    @MinLength(4)
    @MaxLength(20)
    email: string;

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    password: string;
}