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
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust to your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(authMiddleware);

app.use("/login", loginRouter);

app.use("/groups", groupsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Escuchando ando en el puerto ${port}`);
});
