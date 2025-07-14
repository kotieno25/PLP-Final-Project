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
exports.FundPerformance = void 0;
const typeorm_1 = require("typeorm");
const Fund_1 = require("./Fund");
let FundPerformance = class FundPerformance {
};
exports.FundPerformance = FundPerformance;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FundPerformance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], FundPerformance.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal"),
    __metadata("design:type", Number)
], FundPerformance.prototype, "nav", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal"),
    __metadata("design:type", Number)
], FundPerformance.prototype, "yield", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Fund_1.Fund, fund => fund.performances),
    __metadata("design:type", Fund_1.Fund)
], FundPerformance.prototype, "fund", void 0);
exports.FundPerformance = FundPerformance = __decorate([
    (0, typeorm_1.Entity)()
], FundPerformance);
