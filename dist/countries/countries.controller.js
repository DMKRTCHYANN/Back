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
exports.CountriesController = void 0;
const common_1 = require("@nestjs/common");
const countries_service_1 = require("./countries.service");
class UpdateCountryDto {
}
let CountriesController = class CountriesController {
    constructor(countriesService) {
        this.countriesService = countriesService;
    }
    async create(name) {
        if (!name) {
            throw new common_1.HttpException('Название страны обязательно', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            return await this.countriesService.createCountry(name);
        }
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY' || error.code === '23505') {
                throw new common_1.HttpException('Страна с таким названием уже существует', common_1.HttpStatus.CONFLICT);
            }
            throw new common_1.HttpException('Ошибка сервера', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        try {
            return await this.countriesService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException('Ошибка при получении стран', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUserInId(id) {
        return this.countriesService.getCountryInId(id);
    }
    async updateCountry(id, updateCountryDto) {
        return await this.countriesService.updateCountry(id, updateCountryDto);
    }
    async deleteCountry(id) {
        try {
            return await this.countriesService.deleteCountry(id);
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.CountriesController = CountriesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CountriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CountriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CountriesController.prototype, "getUserInId", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateCountryDto]),
    __metadata("design:returntype", Promise)
], CountriesController.prototype, "updateCountry", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CountriesController.prototype, "deleteCountry", null);
exports.CountriesController = CountriesController = __decorate([
    (0, common_1.Controller)('countries'),
    __metadata("design:paramtypes", [countries_service_1.CountriesService])
], CountriesController);
//# sourceMappingURL=countries.controller.js.map