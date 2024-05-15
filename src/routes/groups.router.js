import express from "express";
import groupsController from "../controllers/groups.controller.js";
import passport from "passport";

const groupsRouter = express.Router();

groupsRouter.get("/", groupsController.getAll);
groupsRouter.get("/:id", groupsController.getById);
groupsRouter.post("/", groupsController.create);
groupsRouter.put("/:id", groupsController.editById);
groupsRouter.delete("/:id", groupsController.deleteById);

export default groupsRouter;
