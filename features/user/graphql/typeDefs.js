module.exports = () => {
  const typeDefs = /* GraphQL */ `
    scalar Date

    type User {
      id: String
      username: String
      email: String
      avatar: String
      desc: String
      memberSince: Date
      from: String
      registeredAsSeller: Boolean
    }

    type Query {
      login(email: String, password: String): String
    }

    type Mutation {
      register(username: String, password: String, email: String): Boolean
    }

    schema {
      query: Query
      mutation: Mutation
    }
  `;
  return typeDefs;
};
