module.exports = (api, UserService) => {
  api.use('/users', UserService);
};
