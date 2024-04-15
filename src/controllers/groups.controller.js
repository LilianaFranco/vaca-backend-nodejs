import groupsService from "../services/groups.service.js";

const getAll = (req, res) => {
  const groups = groupsService.getAll();
  return res.status(200).json({ groups });
};

const getById = (req, res) => {
  const group = groupsService.getById(req.params.id);
  if (!group) {
    return res
      .status(400)
      .json({ message: `Group with id ${req.params.id} does not exist` });
  }
  return res.status(200).json({ group });
};

const create = (req, res) => {
  try {
    const newGroup = groupsService.create(req.body);
    return res.status(201).json({ group: newGroup });
  } catch (error) {
    return res.status(409).json({ error: error.message });
  }
};

const editById = (req, res) => {
  const groupUpdated = groupsService.editById(req.params.id, req.body);

  if (groupUpdated) {
    return res.status(204).send();
  }

  return res
    .status(404)
    .json({ message: `Group with id ${req.params.id} does not exist` });
};

const deleteById = (req, res) => {
  const removed = groupsService.editById(req.params.id);

  if (removed) {
    return res.status(204).send();
  } else {
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
