import { connection } from "../../config";

type Args = {
  id: number;
};

const getPostByIdQuery = async ({ id }: Args) => {
  const sql = {
    text: `SELECT * FROM posts WHERE id = $1`,
    values: [id],
  };

  return connection.query(sql);
};

export default getPostByIdQuery;