import express from "express";

import {
  loginUser,
  myProfile,
  signupUser,
  userLogout,
  test,
} from "../controller/userController.js";
import { authentication } from "../auth/auth.js";
import { newPost } from "../controller/postController.js";
const Router = express.Router();

Router.post("/signup", signupUser);
Router.post("/login", loginUser);
Router.get("/profile", authentication, myProfile);
Router.post("/new", authentication, newPost);
Router.post("/logout", authentication, userLogout);
Router.get("/test", test);

export default Router;
