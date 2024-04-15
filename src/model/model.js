const Model = () => {
  const entities = [];

  console.log(4, "[Group] Model");

  const getById = (id) => {
    console.log(4.1, "[Database] Model findUnique");

    return entities.find((entity) => entity.id === id);
  };

  const getAll = () => {
    console.log(4.1, "[Database] Model findMany");

    return entities;
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
