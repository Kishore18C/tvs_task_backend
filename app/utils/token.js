import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default (payload) => {
  return Jwt.sign(payload, process.env.JWT_SECRET);
};
