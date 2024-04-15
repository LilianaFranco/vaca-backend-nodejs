import groupsService from "../services/groups.service.js";

const getAll = (req, res) => {
  const groups = groupsService.getAll();
  return res.status(200).json({ groups });
};

const getById = (req, res) => {
  const id = parseInt(group.id);
  //NaN is falsy
  if (!id) {
    return res.status(400).json({ message: "Id not valid" });
  }

  const group = groupsService.getById(id);

  if (!group) {
    return res
      .status(404)
      .json({ message: `Group with id ${req.params.id} does not exist` });
  }
  return res.status(200).json({ group });
};

const create = (req, res) => {
  //Que me manden nombre
  const { name, color } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name not valid" });
  }
  //Que el nombre sea tipo string
  if (typeof name !== "string") {
    return res.status(400).json({ message: "Name is not a string" });
  }
  //Que el nombre no sea un string vacío
  if (!name.trim()) {
    return res.status(400).json({ message: "Name is empty" });
  }

  //Que me manden color
  if (!color) {
    return res.status(400).json({ message: "Color not valid" });
  }
  //Que el nombre sea tipo string
  if (typeof color !== "string") {
    return res.status(400).json({ message: "Color is not a string" });
  }
  //Que el nombre no sea un string vacío
  if (!color.trim()) {
    return res.status(400).json({ message: "Color is empty" });
  }
  try {
    const newGroup = groupsService.create(req.body);
    return res.status(201).json({ group: newGroup });
  } catch (error) {
    //Eliminar el 400 cuando todas las ecepciones ya estén cambiadas
    return res.status(error.statusCode || 400).send({ error: error.message });
  }
};

const editById = (req, res) => {
  try {
    const groupUpdated = groupsService.editById(req.params.id, req.body);
    if (groupUpdated) {
      return res.status(204).send();
    }
  } catch {
    return res
      .status(404)
      .json({ message: `Group with id ${req.params.id} does not exist` });
  }
};

const deleteById = (req, res) => {
  try {
    const removed = groupsService.editById(req.params.id);
    if (removed) {
      return res.status(204).send();
    }
  } catch (error) {
    return res
      .status(404)
      .send({ message: `Group with id ${req.params.id} does not exist` });
  }
};

export default {
  getAll,
  getById,
  create,
  editById,
  deleteById,
};
