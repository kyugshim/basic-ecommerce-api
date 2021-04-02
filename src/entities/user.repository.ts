import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialsDto } from '../auth/dto/auth_credentials.dto';
import { AuthUserLogInDto } from '../auth/dto/auth_user_login.dto';


@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, email, password } = authCredentialsDto;

        const user = new User();
        user.username = username;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
        } catch (error) {
            if (error.code === '0707') {
                throw new ConflictException('이름 중복');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
    async validateUserPassword(authUserLogInDto: AuthUserLogInDto): Promise<string> {
        const { username, password } = authUserLogInDto;
        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}