import express from "express";
import usersController from "../controllers/users.controller.js";
import passport from "passport";

const usersRouter = express.Router();

usersRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  usersController.getAll
);
usersRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  usersController.getById
);
usersRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  usersController.create
);
usersRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  usersController.editById
);
usersRouter.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  usersController.deleteByEmail
);

export default usersRouter;
