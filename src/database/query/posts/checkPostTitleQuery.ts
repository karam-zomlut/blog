import { connection } from "../../config";

type args = {
  title: string;
};

const checkPostTitleQuery = async ({ title }: args) => {
  const sql = {
    text: "SELECT * FROM posts WHERE title = $1",
    values: [title],
  };

  return connection.query(sql);
};

export default checkPostTitleQuery;