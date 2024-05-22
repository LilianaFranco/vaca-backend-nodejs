import connection from "../lib/connection.js";
import bcrypt from "bcrypt";

const Model = () => {
  const entities = [];

  const getAll = async () => {
    const client = await connection.connect();

    const res = await client.query("SELECT * FROM users ORDER BY name DESC");

    client.release();
    return res.rows;
  };

  const getById = async (id) => {
    const client = await connection.connect();
    const res = await client.query("SELECT * FROM users WHERE id= $1", [id]);
    client.release();
    return res.rows[0];
  };

  const existByEmail = async (email) => {
    const client = await connection.connect();
    const res = await client.query(
      "SELECT COUNT(*) FROM users WHERE email= $1",
      [email]
    );
    client.release();

    return res.rows[0].count > 0;
  };

  const getByEmail = async (email) => {
    const client = await connection.connect();
    const res = await client.query("SELECT * FROM users WHERE email= $1", [
      email,
    ]);
    client.release();

    return res.rows[0];
  };

  const create = async (user) => {
    const client = await connection.connect();
    const { name, email, password } = user;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const res = await client.query(
      "INSERT into users (name, email, password, createdAt) values ($1, $2, $3, now()) returning name, email",
      [name, email, encryptedPassword]
    );

    client.release();

    return res.rows;
  };

  const update = async (id, entity) => {
    const client = await connection.connect();

    const res = await client.query(
      "UPDATE users SET name = $1, color = $2 WHERE id=$3 returning *",
      [entity.name, entity.color, id]
    );

    client.release();

    return res.rows[0];
  };

  return {
    getById,
    getAll,
    create,
    update,
    existByEmail,
    getByEmail,
  };
};

export { Model };
