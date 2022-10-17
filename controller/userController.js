import User from "../Model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (username === "" && email === "" && password === "") {
    return res.status(400).json({
      success: false,
      message: "all Fields Are Required",
    });
  }

  const isExist = await User.findOne({ email });

  if (isExist) {
    return res
      .status(401)
      .json({ success: false, message: `user already exist` });
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });

  await user.save();
  return res
    .status(200)
    .json({ success: true, message: `user  sugnup successfully` });
};

// login user

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("login");

  if (email === "" && password === "") {
    return res.status(400).json({
      success: false,
      message: "All Fields Are Required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ success: false, message: "user not exist" });
  }
  const match = await bcrypt.compare(password, user.password);

  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (match) {
    user.password = undefined;
    return res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
      message: "Logged in successfully 😊 👌",
    });
  } else {
    return res.status(400).json({ error: "password not match" });
  }
};

export const myProfile = (req, res) => {
  console.log("running");
};
