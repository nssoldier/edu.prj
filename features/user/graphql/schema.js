module.exports = (graphqlTools, typeDefs, resolvers) => {
  const schema = graphqlTools.makeExecutableSchema({
    typeDefs,
    resolvers
  });

  return schema;
};
