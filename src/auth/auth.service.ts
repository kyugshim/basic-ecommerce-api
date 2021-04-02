import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../entities/user.repository';
import { AuthCredentialsDto } from '../auth/dto/auth_credentials.dto';
import { JwtPayload } from '../auth/jwt_payload.interface';
import { AuthUserLogInDto } from '../auth/dto/auth_user_login.dto';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthUserLogInDto): Promise<{ token: string, user: string, id: number }> {
        const { username } = authCredentialsDto;
        const found = await this.userRepository.findOne({ username });
        let token;
        {
            const username = await this.userRepository.validateUserPassword(authCredentialsDto);

            if (!username) {
                throw new UnauthorizedException('invalid credentials');
            }

            const payload: JwtPayload = { username };
            token = await this.jwtService.sign(payload);
            this.logger.debug('Generated JWT Token with payload ${JSON.stringify(payload)}');
        }

        const user = found.username;
        const id = found.id;

        return { token, user, id };
    }
}
