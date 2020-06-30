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
const mongoose_1 = require("mongoose");
const type_graphql_1 = require("type-graphql");
let Link = class Link {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", mongoose_1.Schema.Types.ObjectId)
], Link.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Link.prototype, "uid", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Link.prototype, "url", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Link.prototype, "domain", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Link.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Link.prototype, "image", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Link.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Link.prototype, "createdAt", void 0);
Link = __decorate([
    type_graphql_1.ObjectType()
], Link);
exports.Link = Link;
let UpdateLinkInput = class UpdateLinkInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateLinkInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateLinkInput.prototype, "description", void 0);
UpdateLinkInput = __decorate([
    type_graphql_1.InputType()
], UpdateLinkInput);
exports.UpdateLinkInput = UpdateLinkInput;
let LinksResult = class LinksResult {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], LinksResult.prototype, "totalCount", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], LinksResult.prototype, "hasNextPage", void 0);
__decorate([
    type_graphql_1.Field(() => [Link], { nullable: true }),
    __metadata("design:type", Array)
], LinksResult.prototype, "links", void 0);
LinksResult = __decorate([
    type_graphql_1.ObjectType()
], LinksResult);
exports.LinksResult = LinksResult;
//# sourceMappingURL=LinkTypes.js.map