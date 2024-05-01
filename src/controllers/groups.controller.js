import groupsService from "../services/groups.service.js";

const getAll = async (req, res) => {
  const groups = await groupsService.getAll();
  return res.status(200).json({ groups });
};

const getById = async (req, res) => {
  const id = req.params.id;
  console.log(`This is the ${id}`);
  //NaN is falsy
  if (!parseInt(id)) {
    return res.status(400).json({ message: "Id not valid" });
  }

  const group = await groupsService.getById(id);
  if (!group) {
    return res
      .status(404)
      .json({ message: `Group with id ${req.params.id} does not exist` });
  }
  return res.status(200).json({ group });
};

const create = async (req, res) => {
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
    const newGroup = await groupsService.create(req.body);
    return res.status(201).json({ group: newGroup });
  } catch (error) {
    //ToDo: Eliminar el 400 cuando todas las excepciones ya estén cambiadas
    return res.status(error.statusCode || 400).send({ error: error.message });
  }
};

const editById = async (req, res) => {
  const id = req.params.id;
  const { name, color } = req.body;

  //NaN is falsy
  if (!parseInt(id)) {
    return res.status(400).json({ message: "Id not valid" });
  }
  //ToDo : refactor con validaciones del create
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
    const newGroup = await groupsService.editById(id, req.body);
    return res.status(201).json({ group: newGroup });
  } catch (error) {
    //ToDo: Eliminar el 400 cuando todas las excepciones ya estén cambiadas
    return res.status(error.statusCode || 400).send({ error: error.message });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  //NaN is falsy
  if (!parseInt(id)) {
    return res.status(400).json({ message: "Id not valid" });
  }

  const wasDeleted = await groupsService.deleteById(id);
  return wasDeleted ? res.status(204).send() : res.status(409).send();
};

export default {
  getAll,
  getById,
  create,
  editById,
  deleteById,
};
