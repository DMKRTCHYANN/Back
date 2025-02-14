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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../typeorm/entities/user.entity");
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
        return { data: users, total };
    }
    async findUsers(filter) {
        const { country, page, limit } = filter;
        const pageNumber = isNaN(Number(page)) ? 1 : Number(page);
        const limitNumber = isNaN(Number(limit)) ? 10 : Number(limit);
        const query = this.userRepository.createQueryBuilder('user');
        query.leftJoinAndSelect('user.country', 'country');
        if (country) {
            query.andWhere('country.id = :country', { country });
        }
        query.skip((pageNumber - 1) * limitNumber).take(limitNumber);
        const [data, total] = await query.getManyAndCount();
        return { data, total };
    }
    async validateUser(username, password) {
        const user = await this.userRepository.findOne({
            where: { username },
            relations: ['country'],
        });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid username or password');
        }
        return {
            id: user.id,
            username: user.username,
            country: user.country.name,
        };
    }
    async createUser(createUserDto) {
        let country = await this.countryRepository.findOneBy({
            name: createUserDto.country,
        });
        if (!country) {
            country = this.countryRepository.create({ name: createUserDto.country });
            await this.countryRepository.save(country);
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
            country,
            createdAt: new Date(),
        });
        return await this.userRepository.save(newUser);
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
    async getUsersByCountry(countryId) {
        return await this.userRepository.find({
            where: { country: { id: countryId } },
            relations: ['country'],
        });
    }
    async hashExistingPasswords() {
        const users = await this.userRepository.find();
        for (const user of users) {
            if (!user.password.startsWith('$2b$')) {
                user.password = await bcrypt.hash(user.password, 10);
                await this.userRepository.save(user);
            }
        }
    }
    async findOneByUsername(username) {
        return this.userRepository.findOne({
            where: { username },
            relations: ['country'],
        });
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