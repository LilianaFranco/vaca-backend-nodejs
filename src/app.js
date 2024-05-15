import express from "express";
import groupsRouter from "./routes/groups.router.js";
import usersRouter from "./routes/users.router.js";
import "./utils/passport.config.js";
import authMiddleware from "./middlewares/auth.middleware.js";

import cors from "cors";

import loginRouter from "./routes/login.router.js";

const app = express();
const port = 3001;

app.use(express.json());
// app.use(passport.initialize());
app.use(cors());
app.use(authMiddleware);

app.use("/login", loginRouter);

app.use(
  "/groups",
  // passport.authenticate("jwt", { session: false }),
  groupsRouter
); //Este enpoint está protegido por eso no funcionará el front
app.use("/users", usersRouter);
// app.get(
//   "/check",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.send("You are authenticated");
//   }
// );
app.listen(port, () => {
  console.log(`Escuchando ando en el puerto ${port}`);
});
