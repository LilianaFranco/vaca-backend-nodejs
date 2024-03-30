// es el que mapea el response y el request

import groupsService from "../services/groups.service.js";

const getAll = () => {
  groupsService.get();
};

const getById = () => {
  groupsService.getById("id");
};

const create = () => {
  groupsService.create();
};

const deleteById = () => {
  groupsService.deleteById("id");
};

export default {
  getAll,
  getById,
  create,
  deleteById,
};
