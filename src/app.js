import express from "express";
import groupsRouter from "./routes/groups.router.js";
import usersRouter from "./routes/users.router.js";

import cors from "cors";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use("/groups", groupsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Escuchando ando en el puerto ${port}`);
});
