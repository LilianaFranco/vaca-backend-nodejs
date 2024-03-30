import db from "../database/db.js";

const get = (req, res) => {
  const resBody = db;
  res.status(200).json(resBody);
};

const getById = (req, res) => {
  const groupId = parseInt(req.params.id);
  const group = db.find((group) => group.id === groupId);
  if (!group) {
    return res.status(400).json({ error: "El grupo no existe" });
  }
  res.status(200).json(group);
};

const create = (req, res) => {
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
};

const deleteById = (req, res) => {
  const groupId = parseInt(req.params.id);
  const index = db.findIndex((group) => group.id === groupId);

  if (index !== -1) {
    const deletedGroup = db.splice(index, 1)[0]; // Remove the group from the array
    return res
      .status(200)
      .json({ message: "Group deleted successfully", deletedGroup });
  } else {
    return res.status(404).json({ error: "Group not found" });
  }
};

export default { getById, get, create, deleteById };
