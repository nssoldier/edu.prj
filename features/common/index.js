module.exports = {
  name: "common",
  description: "Common module",
  services: {
    UserModel: "user.model << mongoose, ::mongoose"
  },
  exports: ["UserModel"]
};
