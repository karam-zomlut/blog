import { connection } from "../../config";

type Args = {
  pageSize: number;
  offset: number;
}

const getAllPostsQuery = async({ pageSize, offset}: Args) => {
  const sql = {
    text: `SELECT * FROM posts ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
    values: [pageSize, offset],
  };

  return connection.query(sql);
}

export default getAllPostsQuery;