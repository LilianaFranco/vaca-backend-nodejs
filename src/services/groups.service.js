import { Model } from "../model/groupsModel.js";
import Exceptions from "../exceptions/index.js";

const groupModel = Model();

/* ToDo: mover esto a su propio endpoint 
y consumirlo desde el color picker para 
que los colores tengan un único origen */
const colorPalette = [
  "#A65293",
  "#66B04C",
  "#995036",
  "#4E80A5",
  "#CCCCCC",
  "#FFA72F",
  "#FF2530",
  "#FFFFFF",
];

const getAll = () => {
  return groupModel.getAll();
};

const getById = (id) => {
  const group = groupModel.getById(id);
  return group;
};

const create = async (newGroup) => {
  if (await groupModel.getByName(newGroup.name)) {
    throw new Exceptions.ConflictException("Group already exists");
  }
  return groupModel.create(newGroup);
};

const checkGroup = async (id) => {
  const existingGroupValidation = await groupModel.getById(id);
  if (!existingGroupValidation) {
    throw new Exceptions.NotFoundException("The group does not exist.");
  }
};

const editById = async (id, group) => {
  await checkGroup(id);
  return groupModel.update(id, group);
};

const deleteById = async (id) => {
  await checkGroup(id);
  return groupModel.delete(id);
};

export default { getAll, getById, create, editById, deleteById };
