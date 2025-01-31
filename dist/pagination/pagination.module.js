"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../typeorm/entities/user.entity");
const pagination_controller_1 = require("./pagination.controller");
const pagination_service_1 = require("./pagination.service");
let PaginationModule = class PaginationModule {
};
exports.PaginationModule = PaginationModule;
exports.PaginationModule = PaginationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntitiy])],
        controllers: [pagination_controller_1.PaginationController],
        providers: [pagination_service_1.PaginationService],
        exports: [pagination_service_1.PaginationService],
    })
], PaginationModule);
//# sourceMappingURL=pagination.module.js.map