import usersService from "../services/users.service.js";
import { newUserSchemaValidation } from "../validations/users.schema.validations.js";
import { userIdSchemaValidation } from "../validations/users.schema.validations.js";

const getAll = async (req, res) => {
  const users = await usersService.getAll();
  return res.status(200).json({ users });
};

const getById = async (req, res) => {
  const id = req.params.id;
  console.log(`This is the ${id}`);

  const { error } = userIdSchemaValidation.validate({ id });
  if (error) {
    return res.status(400).json({
      message: error.details.map((detail) => detail.message),
    });
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
  const { error, value } = newUserSchemaValidation.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: error.details.map((detail) => error.message),
    });
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
  const { error } = userIdSchemaValidation.validate({ id });
  if (error) {
    return res.status(400).json({
      message: error.details.map((detail) => detail.message),
    });
  }
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
