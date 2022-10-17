import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  post: [],
});

const User = mongoose.model("account", userSchema);

// userSchema.methods.generateToken = async function () {
//   return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
// };

export default User;
