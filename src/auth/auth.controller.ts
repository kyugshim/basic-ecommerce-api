import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth_credentials.dto';
import { AuthService } from './auth.service';
import { AuthUserLogInDto } from './dto/auth_user_login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authUserLoginDto: AuthUserLogInDto): Promise<{ token: string, user: string, id: number }> {
        return this.authService.signIn(authUserLoginDto);
    }
}
