import { connection } from "../../config";

type Args = {
  id: number;
};

const deletePostQuery = async ({ id }: Args) => {
  const sql = {
    text: `DELETE FROM posts WHERE id = $1`,
    values: [id],
  };

  return connection.query(sql);
};

export default deletePostQuery;