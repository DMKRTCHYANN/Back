import { CountriesService } from './countries.service';
declare class UpdateCountryDto {
}
export declare class CountriesController {
    private readonly countriesService;
    constructor(countriesService: CountriesService);
    create(name: string): Promise<import("./entities/country.entity").Country>;
    findAll(): Promise<import("./entities/country.entity").Country[]>;
    getUserInId(id: number): Promise<import("./entities/country.entity").Country>;
    updateCountry(id: number, updateCountryDto: UpdateCountryDto): Promise<import("./entities/country.entity").Country>;
    deleteCountry(id: number): Promise<{
        message: string;
    }>;
}
export {};
