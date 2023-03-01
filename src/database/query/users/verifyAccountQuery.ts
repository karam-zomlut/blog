import { connection } from "../../config";

const verifyAccountQuery = ({ id }: { id: number }) => {
  const sql = {
    text: "UPDATE users SET verified = true WHERE id = $1 RETURNING id, username, email, verified",
    values: [id],
  };

  return connection.query(sql);
};

export default verifyAccountQuery;