import mongoose from "mongoose";
import User from "./userSchema.js";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  author: {
    type: String,
  },
  image: {
    url: {
      type: String,
    },
    public_id: {
      type: String,
    },
  },
  total_post: {
    type: String,
  },
});

const POST = mongoose.model("post", postSchema);
export default POST;
