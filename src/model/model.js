import connection from "../lib/connection.js";

const Model = () => {
  const entities = [];

  const getById = async (id) => {
    const client = await connection.connect();
    const res = await client.query("SELECT * FROM groups WHERE id= $1", [id]);
    client.release();
    return res.rows[0];
  };

  const getAll = async () => {
    const client = await connection.connect();

    const res = await client.query(
      "SELECT * FROM groups ORDER BY createdAt DESC"
    );

    client.release();
    return res.rows;
  };

  const create = async (entity) => {
    console.log(entity);
    const client = await connection.connect();

    const res = await client.query(
      "INSERT into Groups (name, color, ownerUserId, createdAt) values ($1, $2, $3, now()) returning *",
      [entity.name, entity.color, 1]
    );

    client.release();

    return res.rows;
  };

  const update = async (id, entity) => {
    const client = await connection.connect();

    const res = await client.query(
      "UPDATE Groups SET name = $1, color = $2 WHERE id=$3 returning *",
      [entity.name, entity.color, id]
    );

    client.release();

    return res.rows[0];
  };

  const del = async (id) => {
    const client = await connection.connect();

    const res = await client.query("DELETE from Groups WHERE id = $1", [id]);

    client.release();

    return !!res.rowCount;
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
