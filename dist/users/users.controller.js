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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const createuser_dto_1 = require("./dto/createuser.dto");
const updateuser_dto_1 = require("./dto/updateuser.dto");
const users_service_1 = require("./users.service");
const loginuser_dto_1 = require("./dto/loginuser.dto");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUsersByCountry(countryId) {
        return await this.userService.getUsersByCountry(countryId);
    }
    async getUsers(country, page, limit) {
        if (!country) {
            return this.userService.findAll((page - 1) * limit, limit);
        }
        else {
            return this.userService.findUsers({ country, page, limit });
        }
    }
    async getUserById(id) {
        return await this.userService.getUserInId(id);
    }
    async createUser(createUserDto) {
        return await this.userService.createUser(createUserDto);
    }
    async login(loginUserDto) {
        console.log('Login request received:', loginUserDto);
        const { username, password } = loginUserDto;
        const user = await this.userService.validateUser(username, password);
        if (!user) {
            console.log('Invalid username or password');
            throw new common_1.UnauthorizedException('Invalid username or password');
        }
        return { message: 'Login successful' };
    }
    async updateUser(id, updateUserDto) {
        return await this.userService.updateUser(id, updateUserDto);
    }
    async deleteUser(id) {
        return await this.userService.deleteUser(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('country/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsersByCountry", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('country')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createuser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginuser_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateuser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map