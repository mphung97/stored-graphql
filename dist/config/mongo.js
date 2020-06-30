"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_ID = process.env.MONGO_ID || "";
const MONGO_PASS = process.env.MONGO_PASS || "";
const MONGODB_URL = `mongodb://${MONGO_ID}:${MONGO_PASS}@ds143131.mlab.com:43131/linkbox`;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};
mongoose_1.default
    .connect(MONGODB_URL, options)
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log("MongoDB connect failed", err));
//# sourceMappingURL=mongo.js.map