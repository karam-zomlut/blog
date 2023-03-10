import { connection } from "../../config";

type editPasswordQueryType = {
  id: number;
  password: string;
};

const editPasswordQuery = async ({ id, password}: editPasswordQueryType) => { 
  const sql = {
    text: `UPDATE users SET password = $1 WHERE id = $2`,
    values: [password, id],
  };

  return connection.query(sql);
};

export default editPasswordQuery;