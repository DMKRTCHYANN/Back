import { UserEntitiy } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { Country } from '../countries/entities/country.entity';
export declare class UsersService {
    private userRepository;
    private readonly countryRepository;
    constructor(userRepository: Repository<UserEntitiy>, countryRepository: Repository<Country>);
    getUsers(): Promise<UserEntitiy[]>;
    getUsersByCountry(countryId: number): Promise<UserEntitiy[]>;
    getUserInId(id: number): Promise<UserEntitiy>;
    createUser(createUserDto: CreateUserDto): Promise<UserEntitiy>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserEntitiy>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
}
