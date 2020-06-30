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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const Link_1 = require("../models/Link");
const LinkTypes_1 = require("../types/LinkTypes");
const fetchMetaTag_1 = __importDefault(require("../utils/fetchMetaTag"));
const isURL_1 = require("../utils/isURL");
let LinkResolver = class LinkResolver {
    createLink(url, { uid }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isURL_1.isUrl(url)) {
                throw new apollo_server_express_1.UserInputError("URL invalid", {
                    invalidArgs: "url",
                });
            }
            const isExist = yield Link_1.LinkModel.exists({ url, uid });
            if (isExist) {
                throw new apollo_server_express_1.UserInputError("URL is existed", {
                    invalidArgs: "url",
                });
            }
            try {
                const metadata = yield fetchMetaTag_1.default(url);
                if (metadata.description.length > 110) {
                    metadata.description = metadata.description.substring(0, 110) + "...";
                }
                const options = Object.assign(Object.assign({}, metadata), { uid });
                return yield Link_1.LinkModel.create(options);
            }
            catch (error) {
                throw new apollo_server_express_1.ApolloError("Internal server error", "500");
            }
        });
    }
    updateLink(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Link_1.LinkModel.findByIdAndUpdate(id, input);
                return true;
            }
            catch (error) {
                throw new apollo_server_express_1.ApolloError("Internal server error", "500");
            }
        });
    }
    deleteLink(id, { uid }) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDeleted = yield Link_1.LinkModel.deleteOne({ _id: id, uid });
            if (!isDeleted.deletedCount) {
                throw new apollo_server_express_1.UserInputError("Bad request!");
            }
            return true;
        });
    }
    allLinks(limit, page, { uid }) {
        return __awaiter(this, void 0, void 0, function* () {
            const links = yield Link_1.LinkModel.find({ uid })
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ createdAt: -1 });
            const totalCount = yield Link_1.LinkModel.countDocuments();
            const hasNextPage = (page - 1) * limit + limit < totalCount;
            return {
                totalCount,
                hasNextPage,
                links,
            };
        });
    }
    link(id) {
        return Link_1.LinkModel.findById(id);
    }
};
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => LinkTypes_1.Link),
    __param(0, type_graphql_1.Arg("url")), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LinkResolver.prototype, "createLink", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, LinkTypes_1.UpdateLinkInput]),
    __metadata("design:returntype", Promise)
], LinkResolver.prototype, "updateLink", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => String)), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LinkResolver.prototype, "deleteLink", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Query(() => LinkTypes_1.LinksResult),
    __param(0, type_graphql_1.Arg("limit", { defaultValue: 1, nullable: true })),
    __param(1, type_graphql_1.Arg("page", { defaultValue: 1, nullable: true })),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], LinkResolver.prototype, "allLinks", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Query(() => LinkTypes_1.Link),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LinkResolver.prototype, "link", null);
LinkResolver = __decorate([
    type_graphql_1.Resolver()
], LinkResolver);
exports.LinkResolver = LinkResolver;
//# sourceMappingURL=LinkResolver.js.map