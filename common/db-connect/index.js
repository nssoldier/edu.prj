module.exports = {
  name: "db-connect",
  description: "handle database connection",
  services: {
    mongoose: {
      func(Mongoose) {
        const mongoose = Mongoose.createConnection(
          "mongodb://localhost:27017/tutorbee",
          {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
          }
        );
        return mongoose;
      },
      require: ["::mongoose"]
    }
  },
  exports: ["mongoose"]
};
