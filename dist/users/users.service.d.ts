import { UserEntitiy } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { Country } from '../countries/entities/country.entity';
export declare class UsersService {
    private userRepository;
    private readonly countryRepository;
    constructor(userRepository: Repository<UserEntitiy>, countryRepository: Repository<Country>);
    findAll(offset: number, limit: number): Promise<{
        data: UserEntitiy[];
        total: number;
    }>;
    getUsers(): Promise<UserEntitiy[]>;
    getUsersByCountry(countryId: number): Promise<UserEntitiy[]>;
    getUserInId(id: number): Promise<UserEntitiy>;
    createUser(createUserDto: CreateUserDto): Promise<UserEntitiy>;
    findUsers(filter: {
        country?: string;
        page: number;
        limit: number;
    }): Promise<{
        data: UserEntitiy[];
        total: number;
    }>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserEntitiy>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
}
