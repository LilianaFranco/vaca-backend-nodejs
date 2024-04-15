import { Model } from "../model/model.js";

const groupModel = Model();

const getAll = () => {
  return groupModel.getAll();
};

const getById = (id) => {
  const group = groupModel.getById(id);
  if (!group) {
    throw new Error("Group not found");
  }
  return group;
};

const create = (newGroup) => {
  //Agregar validaciones del backend (nombre 30 o 0 (string), el color (string), userid(int))
  try {
    const existingGroup = groupModel
      .getAll()
      .find((group) => group.name === newGroup.name);
    if (existingGroup) {
      throw new Error("Group already exists");
    }
    const createdGroup = groupModel.create(newGroup);
    return createdGroup;
  } catch (error) {
    throw error;
  }
};

const editById = (id, group) => {
  const isUpdated = groupModel.update(id, group);
  if (!isUpdated) {
    throw new Error("Group not found");
  }
  return groupModel.getById(id);
};

const deleteById = (id) => {
  const isDeleted = groupModel.delete(id);
  if (!isDeleted) {
    throw new Error("Group not found");
  }
  return { success: true };
};

export default { getAll, getById, create, editById, deleteById };
