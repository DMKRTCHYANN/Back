import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserEntitiy } from '../typeorm/entities/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    private: any;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(user: UserEntitiy): Promise<string>;
    validateUser(username: string, pass: string): Promise<UserEntitiy | null>;
    signIn(username: string, password: string): Promise<string>;
}
