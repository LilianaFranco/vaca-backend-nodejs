import connection from "../lib/connection.js";

const Model = () => {
  const getAll = async (userId) => {
    const client = await connection.connect();
    const res = await client.query(
      "SELECT * FROM groups WHERE owneruserid = $1 ORDER BY createdAt DESC",
      [userId]
    );

    client.release();
    return res.rows;
  };

  const getById = async (id) => {
    const client = await connection.connect();
    const res = await client.query("SELECT * FROM groups WHERE id= $1", [id]);
    client.release();
    return res.rows[0];
  };

  const getByName = async (name) => {
    const client = await connection.connect();
    const res = await client.query(
      "SELECT COUNT(*) FROM groups WHERE name= $1",
      [name]
    );
    client.release();

    return res.rows[0].count > 0;
  };

  const create = async (newGroup, userId) => {
    const client = await connection.connect();

    const res = await client.query(
      "INSERT into Groups (name, color, ownerUserId, createdAt) values ($1, $2, $3, now()) returning *",
      [newGroup.name, newGroup.color, userId]
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
    getByName,
  };
};

export { Model };
