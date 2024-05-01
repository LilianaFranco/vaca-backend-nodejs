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

const create = async (newGroup) => {
  const { name, color } = newGroup;
  //Agregar validaciones del backend userid(int))
  nameValidation(name);
  colorValidation(color);

  if (await groupModel.getByName(name)) {
    throw new Exceptions.ConflictException("Group already exists");
  }
  return groupModel.create(newGroup);
};

const checkGroup = async (id) => {
  const existingGroupValidation = await groupModel.getById(id);
  if (!existingGroupValidation) {
    throw new Exceptions.NotFoundException("The group doesn't exist");
  }
};

const editById = async (id, group) => {
  await checkGroup(id);
  nameValidation(group.name);
  colorValidation(group.color);
  return groupModel.update(id, group);
};

const deleteById = async (id) => {
  await checkGroup(id);

  return groupModel.delete(id);
};

export default { getAll, getById, create, editById, deleteById };
