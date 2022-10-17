import express from "express";

import {
  loginUser,
  myProfile,
  signupUser,
} from "../controller/userController.js";
import { authentication } from "../auth/auth.js";
import { newPost } from "../controller/postController.js";
const Router = express.Router();

Router.post("/signup", signupUser);
Router.post("/login", loginUser);
Router.post("/profile", authentication, myProfile);
Router.post("/new", newPost);

export default Router;
