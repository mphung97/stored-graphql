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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./utils/auth"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const LinkResolver_1 = require("./resolvers/LinkResolver");
const UserResolver_1 = require("./resolvers/UserResolver");
dotenv.config();
require("./config/mongo");
const PORT = process.env.PORT || 4001;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [LinkResolver_1.LinkResolver, UserResolver_1.UserResolver],
            authChecker: ({ context }) => {
                return !!context.uid;
            },
        }),
        context: ({ req, res }) => auth_1.default({
            req,
            res,
        }),
    });
    const app = express_1.default();
    app.use(morgan_1.default("tiny"));
    app.use(cookie_parser_1.default());
    app.get("/ping", cors_1.default(), (_, res) => {
        res.json({
            ping: "pong",
        });
    });
    apolloServer.applyMiddleware({
        app,
        cors: {
            origin: "http://localhost:8080",
            credentials: true,
        },
    });
    app.listen(PORT, () => {
        console.log(`Server ready at port: ${PORT}/graphql`);
    });
}))();
//# sourceMappingURL=index.js.map