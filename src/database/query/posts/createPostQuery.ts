import { connection } from '../../config';

type Post = {
  title: string;
  content: string;
  slug: string;
  userId: number;
  image: string;
};

const createPostQuery = async ({ title, content, slug, image, userId }: Post) => {
  const sql = {
    text: `INSERT INTO posts (title, content, slug, image, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    values: [title, content, slug, image, userId],
  };

  return connection.query(sql);
};

export default createPostQuery;
