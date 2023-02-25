import { connection } from '../../config';

type Post = {
  title: string;
  content: string;
  slug: string;
  userId: number;
};

const createPostQuery = async ({ title, content, slug, userId }: Post) => {
  const sql = {
    text: `INSERT INTO posts (title, content, slug, user_id) VALUES ($1, $2, $3, $4) RETURNING *`,
    values: [title, content, slug, userId],
  };

  return connection.query(sql);
};

export default createPostQuery;
