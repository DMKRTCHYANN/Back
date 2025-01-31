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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../typeorm/entities/user.entity");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const country_entity_1 = require("../countries/entities/country.entity");
let UsersService = class UsersService {
    constructor(userRepository, countryRepository) {
        this.userRepository = userRepository;
        this.countryRepository = countryRepository;
    }
    async findAll(offset, limit) {
        const [users, total] = await this.userRepository.findAndCount({
            skip: offset,
            take: limit,
            relations: ['country'],
        });
        return {
            data: users,
            total,
        };
    }
    async getUsers() {
        return await this.userRepository.find({
            relations: ['country'],
        });
    }
    async getUsersByCountry(countryId) {
        return await this.userRepository.find({
            where: { country: { id: countryId } },
            relations: ['country'],
        });
    }
    async getUserInId(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['country'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }
    async createUser(createUserDto) {
        let country = await this.countryRepository.findOneBy({
            name: createUserDto.country,
        });
        if (!country) {
            country = this.countryRepository.create({
                name: createUserDto.country,
            });
            await this.countryRepository.save(country);
        }
        const newUser = this.userRepository.create({
            ...createUserDto,
            country,
            createdAt: new Date(),
        });
        return await this.userRepository.save(newUser);
    }
    async findUsers(filter) {
        const { country, page, limit } = filter;
        const query = this.userRepository.createQueryBuilder('user');
        if (country) {
            query.andWhere('user.country = :country', { country });
        }
        query.skip((page - 1) * limit).take(limit);
        const [data, total] = await query.getManyAndCount();
        return { data, total };
    }
    async updateUser(id, updateUserDto) {
        await this.getUserInId(id);
        await this.userRepository.update(id, { ...updateUserDto });
        return await this.getUserInId(id);
    }
    async deleteUser(id) {
        const user = await this.getUserInId(id);
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        await this.userRepository.delete(id);
        return { message: `User with id ${id} deleted successfully` };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntitiy)),
    __param(1, (0, typeorm_1.InjectRepository)(country_entity_1.Country)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map