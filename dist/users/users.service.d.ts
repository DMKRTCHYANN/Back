import { Repository } from 'typeorm';
import { UserEntitiy } from 'src/typeorm/entities/user.entity';
import { Country } from '../countries/entities/country.entity';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
export declare class UsersService {
    private readonly userRepository;
    private readonly countryRepository;
    constructor(userRepository: Repository<UserEntitiy>, countryRepository: Repository<Country>);
    findAll(offset: number, limit: number): Promise<{
        data: UserEntitiy[];
        total: number;
    }>;
    findUsers(filter: {
        country?: string;
        page: number;
        limit: number;
    }): Promise<{
        data: UserEntitiy[];
        total: number;
    }>;
    validateUser(username: string, password: string): Promise<{
        id: number;
        username: string;
        country: string;
    }>;
    createUser(createUserDto: CreateUserDto): Promise<UserEntitiy>;
    getUserInId(id: number): Promise<UserEntitiy>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserEntitiy>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
    getUsersByCountry(countryId: number): Promise<UserEntitiy[]>;
    hashExistingPasswords(): Promise<void>;
    findOneByUsername(username: string): Promise<UserEntitiy | undefined>;
}
