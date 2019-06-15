module.exports = {
  name: 'user',
  description: 'User module',
  services: {
    Resolvers: './graphql/resolvers << UserModel, ::bcrypt, jwtService',
    TypeDefs: './graphql/typeDefs',
    UserSchema: './graphql/schema << ::graphql-tools, TypeDefs, Resolvers',
    UserService: 'user.service << UserSchema, ::express-graphql',
    UserAPI: 'user.api << api, UserService'
  },
  exports: ['UserService']
};
