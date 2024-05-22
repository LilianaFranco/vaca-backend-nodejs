import express from "express";
import groupsRouter from "./routes/groups.router.js";
import usersRouter from "./routes/users.router.js";
import loginRouter from "./routes/login.router.js";
import "./utils/passport.config.js";
import authMiddleware from "./middlewares/auth.middleware.js";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.use("/login", loginRouter);
app.use("/groups", groupsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Escuchando ando en el puerto ${port}`);
});
