import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    getUsersByCountry(countryId: number): Promise<import("../typeorm/entities/user.entity").UserEntitiy[]>;
    getUsers(country: string, page: number, limit: number): Promise<{
        data: import("../typeorm/entities/user.entity").UserEntitiy[];
        total: number;
    }>;
    getUserById(id: number): Promise<import("../typeorm/entities/user.entity").UserEntitiy>;
    createUser(createUserDto: CreateUserDto): Promise<import("../typeorm/entities/user.entity").UserEntitiy>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<import("../typeorm/entities/user.entity").UserEntitiy>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
}
