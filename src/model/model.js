import connection from "../lib/connection.js";

const Model = () => {
  const entities = [];

  const getById = async (id) => {
    console.log(4.1, "[Database] Model findUnique");
  };

  const getAll = async () => {
    const client = await connection.connect();

    const res = await client.query("SELECT * FROM groups");

    console.log(res);

    return res;
  };

  const create = (entity) => {
    console.log(4.1, "[Database] Model create");

    const maxId = entities.reduce((max, { id }) => Math.max(max, id), 0);
    const newId = (maxId + 1).toString();
    const newEntity = {
      ...entity,
      id: newId,
    };
    entities.push(newEntity);

    return newEntity;
  };

  const update = (id, newEntity) => {
    console.log(4.1, "[Database] Model update");

    const entityIndex = entities.findIndex((entity) => entity.id === id);

    if (entityIndex !== -1) {
      entities[entityIndex] = newEntity;

      return true;
    }

    return false;
  };

  const del = (id) => {
    console.log(4.1, "[Database] Model delete");

    const entityIndex = entities.findIndex((entity) => entity.id === id);

    if (entityIndex !== -1) {
      entities.splice(entityIndex, 1);

      return true;
    }

    return false;
  };

  return {
    getById,
    getAll,
    create,
    delete: del,
    update,
  };
};

export { Model };
