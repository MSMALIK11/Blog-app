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
  likes:[],

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
},
likes: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
],
comments: [
  {
      user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
      },
      comment: {
          type: String,
          required: true,
          trim: true,
      }
  }
],
  image: {
    url: {
      type: String,
    },
    public_id: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
},

});

const POST = mongoose.model("post", postSchema);
export default POST;
