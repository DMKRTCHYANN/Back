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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntitiy = void 0;
const typeorm_1 = require("typeorm");
const country_entity_1 = require("../../countries/entities/country.entity");
let UserEntitiy = class UserEntitiy {
};
exports.UserEntitiy = UserEntitiy;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], UserEntitiy.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false }),
    __metadata("design:type", String)
], UserEntitiy.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntitiy.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], UserEntitiy.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntitiy.prototype, "authStrategy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, (country) => country.users, { nullable: true }),
    __metadata("design:type", country_entity_1.Country)
], UserEntitiy.prototype, "country", void 0);
exports.UserEntitiy = UserEntitiy = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], UserEntitiy);
//# sourceMappingURL=user.entity.js.map