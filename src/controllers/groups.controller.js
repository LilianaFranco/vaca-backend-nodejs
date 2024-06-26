import groupsService from "../services/groups.service.js";
import {
  newGroupSchemaValidation,
  groupIdSchemaValidation,
} from "../validations/groups.schema.validations.js";

const getAll = async (req, res) => {
  const groups = await groupsService.getAll(req.user.id);

  return res.status(200).json({ groups });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { error } = groupIdSchemaValidation.validate({ id });
  if (error) {
    return res.status(400).json({
      message: error.details.map((detail) => detail.message),
    });
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
  console.log("create", req.body, req.user);
  const { error, value } = newGroupSchemaValidation.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      message: error.details.map((detail) => detail.message),
    });
  }

  try {
    const newGroup = await groupsService.create(value, req.user.id);
    return res.status(201).json({ group: newGroup });
  } catch (error) {
    //ToDo: Eliminar el 400 cuando todas las excepciones ya estén cambiadas
    return res.status(error.statusCode || 400).send({ error: error.message });
  }
};

const editById = async (req, res) => {
  const id = req.params.id;

  const { error, value } = newGroupSchemaValidation.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      message: error.details.map((detail) => error.message),
    });
  }
  try {
    const newGroup = await groupsService.editById(id, value);
    return res.status(201).json({ group: newGroup });
  } catch (error) {
    //ToDo: Eliminar el 400 cuando todas las excepciones ya estén cambiadas
    return res.status(error.statusCode || 400).send({ error: error.message });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const { error } = groupIdSchemaValidation.validate({ id });
  if (error) {
    return res.status(400).json({
      message: error.details.map((detail) => detail.message),
    });
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
