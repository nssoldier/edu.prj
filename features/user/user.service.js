module.exports = (userSchema, graphqlHTTP) =>
  graphqlHTTP({
    schema: userSchema,
    graphiql: true
  });
