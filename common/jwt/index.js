module.exports = {
  name: "jwt",
  services: {
    jwtService: {
      require: ["::jsonwebtoken", "::./config"],
      func: (jwt, config) => {
        const JwtService = {};

        JwtService.sign = payload =>
          new Promise((resolve, reject) => {
            jwt.sign(payload, config.jwtSecret, (err, token) => {
              if (err) {
                reject(err);
              } else {
                resolve(token);
              }
            });
          });

        JwtService.verify = token =>
          new Promise((resolve, reject) => {
            jwt.verify(token, config.jwtSecret, (err, payload) => {
              if (err) {
                reject(err);
              } else {
                resolve(payload);
              }
            });
          });

        return JwtService;
      }
    }
  },
  exports: ['jwtService']
};
