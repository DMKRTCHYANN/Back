import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserEntitiy } from '../typeorm/entities/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<UserEntitiy>;
    login(user: UserEntitiy): Promise<string>;
    signIn(username: string, pass: string): Promise<{
        access_token: string;
    }>;
}
