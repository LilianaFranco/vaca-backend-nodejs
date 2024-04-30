import { Model } from "../model/model.js";
// import { ConflictException } from "../exceptions/index.js";
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

const nameValidation = (name) => {
  if (name.length > 30) {
    throw new Exceptions.BadRequestException("Invalid name length");
  }
};

const colorValidation = (color) => {
  if (!colorPalette.includes(color)) {
    throw new Exceptions.BadRequestException("Invalid color");
  }
};

const create = (newGroup) => {
  const { name, color, ownerUserId } = newGroup;
  //Agregar validaciones del backend userid(int))
  nameValidation(name);
  colorValidation(color);
  //ToDo: volverlo case insensitive
  const existingGroup = groupModel
    .getAll()
    .find((group) => group.name === name);
  if (existingGroup) {
    throw new Exceptions.ConflictException("Group already exists");
  }
  const createdGroup = groupModel.create(newGroup);
  return createdGroup;
};

const checkGroup = (id) => {
  const existingGroupValidation = groupModel.getById(id);
  if (!existingGroupValidation) {
    throw new Exceptions.NotFoundException("The group doesn't exist");
  }
};

const editById = (id, group) => {
  checkGroup(id);
  nameValidation(group.name);
  colorValidation(group.color);
  const repetedNameValidation = groupModel
    .getAll()
    .find(
      (foundGroup) => foundGroup.name === group.name && foundGroup.id !== id
    );
  if (repetedNameValidation) {
    throw new Exceptions.ConflictException("Group name already exists");
  }
  groupModel.update(id, group);
  return groupModel.getById(id);
};

const deleteById = (id) => {
  checkGroup(id);
  groupModel.delete(id);
  return { message: "Group deleted" };
};

export default { getAll, getById, create, editById, deleteById };
