import express from "express";
import db from "./database/db.js";

const app = express();
const port = 3001;

app.use(express.json());

app.get("/groups", (req, res) => {
  const resBody = db;
  res.status(200).json(resBody);
});

app.get("/group/:id", (req, res) => {
  const groupId = parseInt(req.params.id);
  const group = db.find((group) => group.id === groupId);
  if (!group) {
    return res.status(400).json({ error: "El grupo no existe" });
  }
  res.status(200).json(group);
});

app.post("/groups", (req, res) => {
  const group = req.body;
  const groupName = group.name;
  console.log("Nuevo grupo:", group);
  const alreadyExist = db.some(
    (existingGroup) => existingGroup.name === groupName
  );
  if (alreadyExist) {
    return res.status(409).json({ error: "El grupo ya existe" });
  }
  db.push(group);
  res.status(201).json({ mensaje: "Grupo creado correctamente", group }); // Corregido req por res
});

app.listen(port, () => {
  console.log(`Escuchando ando en el puerto ${port}`);
});
