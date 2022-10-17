import jwt from "jsonwebtoken";
import User from "../Model/userSchema.js";
export const authentication = async (req, res, next) => {
  try {
    // let { token } = req?.cookies;

    // local login token
    let token = req.headers?.authorization;
    token = token?.split(" ").slice(1).join(" ");

    if (!token) {
      return res.status(401).json({ message: "Login First" });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decode._id);
    res.status(200).json({ success: true, message: "user verify" });
    next();
  } catch (error) {
    return res.status(401).json({ succcess: false, message: error.message });
  }
};
