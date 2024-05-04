import express from "express";
import usersController from "../controllers/users.controller.js";

const usersRouter = express.Router();

usersRouter.get("/", usersController.getAll);
usersRouter.get("/:id", usersController.getById);
usersRouter.post("/", usersController.create);
usersRouter.put("/:id", usersController.editById);
usersRouter.delete("/", usersController.deleteByEmail);

export default usersRouter;
