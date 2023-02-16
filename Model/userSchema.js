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
  posts: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    }
],
followers: [
  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
  }
],
following: [
  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
  }
],

});

const User = mongoose.model("account", userSchema);

// userSchema.methods.generateToken = async function () {
//   return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
// };

export default User;
