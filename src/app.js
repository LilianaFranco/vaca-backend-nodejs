import express from "express";
import apiRouter from "./routes/index.js";

const app = express();
const port = 3001;

app.use(express.json());

app.use("/api/", apiRouter);

app.listen(port, () => {
  console.log(`Escuchando ando en el puerto ${port}`);
});
