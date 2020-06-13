/* 
  The reflect-metadata package we imported at the top is a helper library
  that extends the functionality of TypeScript decorators.
  This package is required to use TypeORM and TypeGraphQL. 
*/

import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { PingResolver } from ".//resolvers/PingResolver";
import "./config/mongo";
import { LinkResolver } from "./resolvers/LinkResolver";
import { UserResolver } from "./resolvers/UserResolver";
import auth from "./utils/auth";

const PORT = 4001;

(async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PingResolver, LinkResolver, UserResolver],
      authChecker: ({ context }) => {
        return context.isAuth;
      },
    }),
    context: ({ req, res }: any) => auth({ req, res }),
  });

  const app = express();
  app.use(cookieParser());
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4001, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
  });
})();
