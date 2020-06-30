"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const shortid_1 = __importDefault(require("shortid"));
const schema = new mongoose_1.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String },
    sid: { type: String, default: shortid_1.default.generate() },
    role: {
        type: String,
        enum: ["admin", "vip", "member"],
        required: true,
        default: "member",
    },
});
exports.UserModel = mongoose_1.model("User", schema);
//# sourceMappingURL=User.js.map