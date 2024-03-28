// es el que mapea el response y el request

import groupsService from "../services/groups.service.js";

const getAll = () => {
  groupsService.get();
};

const getById = () => {
  groupsService.getById();
};

const create = () => {
  groupsService.create();
};

export default {
  getAll,
  getById,
  create,
};
