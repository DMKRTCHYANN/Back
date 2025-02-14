import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/loginuser.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    getUsersByCountry(countryId: number): Promise<import("../typeorm/entities/user.entity").UserEntitiy[]>;
    getUsers(country: string, page: number, limit: number): Promise<{
        data: import("../typeorm/entities/user.entity").UserEntitiy[];
        total: number;
    }>;
    hashPasswords(): Promise<string>;
    getUserById(id: number): Promise<import("../typeorm/entities/user.entity").UserEntitiy>;
    createUser(createUserDto: CreateUserDto): Promise<import("../typeorm/entities/user.entity").UserEntitiy>;
    login(loginUserDto: LoginUserDto): Promise<{
        id: number;
        username: string;
        country: string;
    }>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<import("../typeorm/entities/user.entity").UserEntitiy>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
}
