module.exports = (mongoose) => {
  const User = mongoose.model(
    "user",
    mongoose.Schema(
      {
        first_name: { type: String, default: null },
        last_name: { type: String, default: null },
        email: { type: String, unique: true },
        phone: { type: String, unique: true },
        password: { type: String },
        token: { type: String },
      },
      { timestamps: true }
    )
  );

  return User;
};
