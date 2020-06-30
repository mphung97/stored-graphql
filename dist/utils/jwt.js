"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
exports.REFRESH_TOKEN_SECRET = "REFRESH_TOKEN_SECRET";
exports.ACCESS_TOKEN_SECRET = "ACCESS_TOKEN_SECRET";
exports.createTokens = ({ id, sid }) => {
    const refreshToken = jsonwebtoken_1.sign({ uid: id, sid }, exports.REFRESH_TOKEN_SECRET, {
        expiresIn: "7 days",
    });
    const accessToken = jsonwebtoken_1.sign({ uid: id }, exports.ACCESS_TOKEN_SECRET, {
        expiresIn: "15min",
    });
    return { refreshToken, accessToken };
};
//# sourceMappingURL=jwt.js.map