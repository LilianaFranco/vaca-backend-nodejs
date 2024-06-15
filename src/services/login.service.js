import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Model } from "../model/usersModel.js";

const userModel = Model();

const login = async (email, password) => {
  const user = await userModel.getByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid credentials");
  }
  const payload = { id: user.id, date: Date.now(), name: user.name };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

export default login;
