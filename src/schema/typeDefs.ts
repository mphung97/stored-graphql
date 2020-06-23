import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Link {
    id: ID!
    uid: String!
    url: String!
    domain: String
    title: String
    image: String
    description: String
    createdAt: String!
  }

  input LinkInput {
    uid: String!
    url: String!
  }

  input LinkUpdateInput {
    title: String!
    description: String
  }

  type LoginResponse {
    id: String!
    sid: String!
    username: String!
    accessToken: String!
    refreshToken: String!
  }

  type Mutation {
    createLink(url: String!): Link!
    updateLink(input: LinkUpdateInput!, id: String!): Boolean!
    deleteLink(id: String!): Boolean!
    register(user: UserInput!): Boolean!
    login(user: UserInput!): User!
    logout: Boolean!
  }

  type Query {
    links(page: Int = 0): [Link!]!
    link(id: String!): Link!
    me: String!
    books: [Book]
  }

  type User {
    id: String!
    sid: String!
    username: String!
  }

  input UserInput {
    username: String!
    password: String!
  }

  input UserUpdateInput {
    title: String!
    description: String
  }
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
`;

export default typeDefs;
