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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const bcryptjs = __importStar(require("bcryptjs"));
const shortid = __importStar(require("shortid"));
const type_graphql_1 = require("type-graphql");
const User_1 = require("../models/User");
const UserTypes_1 = require("../types/UserTypes");
const jwt_1 = require("../utils/jwt");
let UserResolver = class UserResolver {
    me() {
        return "me";
    }
    register({ username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = bcryptjs.hashSync(password, 8);
            const success = yield User_1.UserModel.create({
                username: username,
                password: hash,
                sid: shortid.generate(),
            });
            if (!success) {
                return false;
            }
            return true;
        });
    }
    login({ res }, { username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.UserModel.findOne({ username });
            if (!user) {
                throw new apollo_server_express_1.UserInputError("Invalid username or password");
            }
            const valid = yield bcryptjs.compare(password, user.password);
            if (!valid) {
                throw new apollo_server_express_1.UserInputError("Invalid username or password");
            }
            const { _id, sid } = user;
            const { accessToken, refreshToken } = jwt_1.createTokens({
                id: _id,
                sid,
            });
            res.cookie("refresh-token", refreshToken);
            res.cookie("access-token", accessToken);
            return {
                id: _id,
                username,
                sid,
            };
        });
    }
    logout({ uid }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uid) {
                return false;
            }
            const query = yield User_1.UserModel.findByIdAndUpdate(uid, {
                sid: shortid.generate(),
            });
            if (!query) {
                return false;
            }
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Query(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("user", () => UserTypes_1.UserInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserTypes_1.UserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => UserTypes_1.UserResult),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("user", () => UserTypes_1.UserInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UserTypes_1.UserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolver.js.map