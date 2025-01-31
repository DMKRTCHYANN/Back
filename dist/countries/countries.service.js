"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CountriesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const country_entity_1 = require("./entities/country.entity");
const user_entity_1 = require("../typeorm/entities/user.entity");
class UpdateCountryDto {
}
let CountriesService = CountriesService_1 = class CountriesService {
    constructor(countryRepository, userRepository) {
        this.countryRepository = countryRepository;
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(CountriesService_1.name);
    }
    async createCountry(name) {
        try {
            const country = this.countryRepository.create({ name });
            return await this.countryRepository.save(country);
        }
        catch (error) {
            this.logger.error(`Ошибка при создании страны: ${error.message}`);
            throw error;
        }
    }
    async deleteCountry(id) {
        const country = await this.countryRepository.findOne({ where: { id } });
        if (!country) {
            throw new common_1.NotFoundException(`Country with id ${id} not found`);
        }
        await this.userRepository.update({ country: country }, { country: null });
        await this.countryRepository.delete(id);
        this.logger.log(`Country with id ${id} deleted successfully`);
        return { message: `Country with id ${id} deleted successfully` };
    }
    async findAll() {
        try {
            return await this.countryRepository.find();
        }
        catch (error) {
            this.logger.error(`Ошибка при получении списка стран: ${error.message}`);
            throw error;
        }
    }
    async getCountryInId(id) {
        const user = await this.countryRepository.findOne({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`Country with id ${id} not found`);
        }
        return user;
    }
    async updateCountry(id, updateCountryDto) {
        const country = await this.countryRepository.findOne({ where: { id } });
        if (!country) {
            throw new common_1.NotFoundException(`Country with id ${id} not found`);
        }
        await this.countryRepository.update(id, updateCountryDto);
        return await this.countryRepository.findOne({
            where: { id },
        });
    }
};
exports.CountriesService = CountriesService;
exports.CountriesService = CountriesService = CountriesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(country_entity_1.Country)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntitiy)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CountriesService);
//# sourceMappingURL=countries.service.js.map