/*
The reflect-metadata package we imported at the top is a helper library
that extends the functionality of TypeScript decorators.
This package is required to use TypeORM and TypeGraphQL.
 */
import "reflect-metadata";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import express from "express";
import auth from "./utils/auth";
import morgan from "morgan";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { LinkResolver } from "./resolvers/LinkResolver";
import { UserResolver } from "./resolvers/UserResolver";
dotenv.config();

import "./config/mongo";

const PORT = process.env.PORT || 4001;

(async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [LinkResolver, UserResolver],
      authChecker: ({ context }) => {
        return !!context.uid;
      },
    }),
    context: ({ req, res }: any) =>
      auth({
        req,
        res,
      }),
  });

  const app = express();
  app.use(morgan("tiny"));
  app.use(cookieParser());

  app.get("/ping", cors(), (_, res) => {
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
})();
