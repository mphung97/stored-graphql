"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("./jwt");
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("../models/User");
exports.default = ({ req, res }) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.cookies["access-token"];
    const refreshToken = req.cookies["refresh-token"];
    let uid = null;
    if (!refreshToken && !accessToken) {
        return { req, res, uid };
    }
    try {
        const decoded = jsonwebtoken_1.verify(accessToken, jwt_1.ACCESS_TOKEN_SECRET);
        uid = decoded.uid;
        return { req, res, uid };
    }
    catch (_a) { }
    if (!refreshToken) {
        return { req, res, uid };
    }
    let data;
    try {
        data = jsonwebtoken_1.verify(refreshToken, jwt_1.REFRESH_TOKEN_SECRET);
    }
    catch (_b) {
        return { req, res, uid };
    }
    const user = yield User_1.UserModel.findById(data.uid);
    if (!user || user.sid !== data.sid) {
        return { req, res, uid };
    }
    const tokens = jwt_1.createTokens(user);
    res.cookie("refresh-token", tokens.refreshToken, { maxAge: 604800000 });
    res.cookie("access-token", tokens.accessToken, { maxAge: 900000 });
    uid = data.uid;
    return { req, res, uid };
});
//# sourceMappingURL=auth.js.map