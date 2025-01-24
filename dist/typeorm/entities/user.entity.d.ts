import { Country } from '../../countries/entities/country.entity';
export declare class UserEntitiy {
    id: number;
    username: string;
    password: string;
    createdAt: Date;
    authStrategy: string;
    country: Country;
}
