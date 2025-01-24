import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { UserEntitiy } from '../typeorm/entities/user.entity';
declare class UpdateCountryDto {
}
export declare class CountriesService {
    private readonly countryRepository;
    private userRepository;
    private readonly logger;
    constructor(countryRepository: Repository<Country>, userRepository: Repository<UserEntitiy>);
    createCountry(name: string): Promise<Country>;
    deleteCountry(id: number): Promise<{
        message: string;
    }>;
    findAll(): Promise<Country[]>;
    getCountryInId(id: number): Promise<Country>;
    updateCountry(id: number, updateCountryDto: UpdateCountryDto): Promise<Country>;
}
export {};
