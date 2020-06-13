/* 
  The reflect-metadata package we imported at the top is a helper library
  that extends the functionality of TypeScript decorators.
  This package is required to use TypeORM and TypeGraphQL. 
*/

import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection, getConnectionOptions } from "typeorm";
import { PingResolver } from ".//resolvers/PingResolver";
import { LinkResolver } from "./resolvers/LinkResolver";
import { MovieResolver } from "./resolvers/MovieResolver";
import { UserResolver } from "./resolvers/UserResolver";

const PORT = 4001;

(async () => {
  const app = express();

  // db connect
  const connectionOptions = await getConnectionOptions();
  Object.assign(connectionOptions, { useUnifiedTopology: true });
  await createConnection(connectionOptions);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PingResolver, MovieResolver, LinkResolver, UserResolver],
    }),
    context: ({ req, res }: any) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4001, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
  });
})();
