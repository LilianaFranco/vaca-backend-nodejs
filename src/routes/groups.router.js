import express from "express";
import groupsController from "../controllers/groups.controller.js";
import passport from "passport";

const groupsRouter = express.Router();

groupsRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  groupsController.getAll
);
groupsRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  groupsController.getById
);
groupsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  groupsController.create
);
groupsRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  groupsController.editById
);
groupsRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  groupsController.deleteById
);

export default groupsRouter;
