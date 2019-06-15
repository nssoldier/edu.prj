module.exports = (mongooseConnect, mongoose) => {
  const model = mongooseConnect.model(
    "user",
    new mongoose.Schema(
      {
        username: { type: String },
        password: String,
        email: { type: String },
        displayName: String,
        avatar: String,
        desc: String,
        from: String,
        registeredAsSeller: Boolean
      },
      {
        timestamps: true
      }
    ),
    "users"
  );
  return model;
};
