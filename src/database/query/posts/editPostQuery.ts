import { connection } from '../../config';

type Args = {
  id: number;
  title: string;
  content: string;
  slug: string;
};

const editPostQuery = async ({ id, title, content, slug }: Args) => {
  const sql = {
    text: `UPDATE posts SET title = $1, content = $2, slug = $3 WHERE id = $4 RETURNING *`,
    values: [title, content, slug, id],
  };

  return connection.query(sql);
};

export default editPostQuery;
