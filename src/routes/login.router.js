import express from "express";
import loginController from "../controllers/login.controller.js";

const loginRouter = express.Router();

loginRouter.post("/", loginController.login);

export default loginRouter;
