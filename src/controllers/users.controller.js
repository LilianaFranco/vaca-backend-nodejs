import usersService from "../services/users.service.js";

const getAll = async (req, res) => {
  const users = await usersService.getAll();
  return res.status(200).json({ users });
};

const getById = async (req, res) => {
  const id = req.params.id;
  console.log(`This is the ${id}`);
  //NaN is falsy
  if (!parseInt(id)) {
    return res.status(400).json({ message: "Id not valid" });
  }

  const user = await usersService.getById(id);
  if (!user) {
    return res
      .status(404)
      .json({ message: `User with id ${req.params.id} does not exist` });
  }
  return res.status(200).json({ user });
};

const create = async (req, res) => {
  //Que me manden email
  const { name, email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email not valid" });
  }
  //Que el nombre sea tipo string
  if (typeof name !== "string") {
    return res.status(400).json({ message: "Name is not a string" });
  }
  //Que el nombre no sea un string vacío
  if (!name.trim()) {
    return res.status(400).json({ message: "Name is empty" });
  }

  try {
    const newUser = await usersService.create(req.body);
    return res.status(201).json({ user: newUser });
  } catch (error) {
    //ToDo: Eliminar el 400 cuando todas las excepciones ya estén cambiadas
    return res.status(error.statusCode || 400).send({ error: error.message });
  }
};

const editById = async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  try {
    const newUser = await usersService.editById(id, req.body);
    return res.status(201).json({ user: newUser });
  } catch (error) {
    //ToDo: Eliminar el 400 cuando todas las excepciones ya estén cambiadas
    return res.status(error.statusCode || 400).send({ error: error.message });
  }
};

const deleteByEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email not valid" });
  }

  const wasDeleted = await usersService.deleteByEmail(email);
  return wasDeleted ? res.status(204).send() : res.status(409).send();
};

export default { getAll, getById, create, editById, deleteByEmail };
