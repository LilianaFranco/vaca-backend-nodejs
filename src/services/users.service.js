import { Model } from "../model/usersModel.js";
import Exceptions from "../exceptions/index.js";

const usersModel = Model();

const getAll = () => {
  return usersModel.getAll();
};

const getById = (id) => {
  const user = usersModel.getById(id);
  return user;
};

const create = async (user) => {
  if (await usersModel.existByEmail(user.email)) {
    throw new Exceptions.ConflictException("The user already exists");
  }
  return usersModel.create(user);
};

const checkUser = async (email) => {
  const existingUserValidation = await usersModel.getByEmail(email);
  if (!existingUserValidation) {
    throw new Exceptions.NotFoundException("The user doesn't exist");
  }
};

const editById = async (id, user) => {
  await checkUser(user.email);
  return usersModel.update(id, user);
};

export default { getAll, getById, create, editById };
