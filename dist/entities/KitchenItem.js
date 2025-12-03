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
exports.KitchenItem = void 0;
const typeorm_1 = require("typeorm");
const Level_1 = require("./Level");
const KitchenCategory_1 = require("./KitchenCategory");
const Admin_1 = require("./Admin");
let KitchenItem = class KitchenItem {
};
exports.KitchenItem = KitchenItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], KitchenItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], KitchenItem.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Level_1.Level, level => level.items, { eager: true }),
    __metadata("design:type", Level_1.Level)
], KitchenItem.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => KitchenCategory_1.KitchenCategory, cat => cat.items, { eager: true }),
    __metadata("design:type", KitchenCategory_1.KitchenCategory)
], KitchenItem.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Admin_1.Admin, admin => admin.items, { eager: true }),
    __metadata("design:type", Admin_1.Admin)
], KitchenItem.prototype, "admin", void 0);
exports.KitchenItem = KitchenItem = __decorate([
    (0, typeorm_1.Entity)()
], KitchenItem);
