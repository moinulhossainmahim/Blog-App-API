const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("This email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.findByCredentials = async (username, pass) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("unable to log in");
  }
  const isMatch = await bcrypt.compare(pass, user.password);
  if (!isMatch) {
    throw new Error("unable to log in");
  }
  const { password, ...restInfos } = user._doc;
  return restInfos;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
