import { connection } from "../../config"

const getTotalPostsQuery = async() => {
  const sql = {
    text: `SELECT COUNT(*) FROM posts`,
  };
  
  return connection.query(sql);
};

export default getTotalPostsQuery;