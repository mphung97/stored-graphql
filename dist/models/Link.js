"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    url: { type: String },
    domain: { type: String },
    title: { type: String },
    image: { type: String },
    description: { type: String },
    uid: { type: String, required: true },
    createdAt: { type: Number, default: Date.now() },
});
exports.LinkModel = mongoose_1.model("Link", schema);
//# sourceMappingURL=Link.js.map