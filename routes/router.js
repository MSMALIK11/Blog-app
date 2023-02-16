import express from "express";

import {
  loginUser,
  myProfile,
  signupUser,
  userLogout,
  test,
} from "../controller/userController.js";
import { authentication } from "../auth/auth.js";
import { deletePost, getAllPost, newPost, likeUnlikePost } from "../controller/postController.js";
const Router = express.Router();

Router.post("/signup", signupUser);
Router.post("/login", loginUser);
Router.get("/profile", authentication, myProfile);
Router.post("/new", authentication, newPost);
Router.get("/posts", authentication,getAllPost);
Router.delete("/post/:id",authentication,deletePost);
Router.get("/post/:id",authentication,likeUnlikePost);
Router.post("/logout", authentication, userLogout);
Router.get("/test", test);

export default Router;
