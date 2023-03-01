import { connection } from '../../config';

type User = {
  username: string;
  email: string;
  password: string;
};

const signupQuery = ({ username, email, password }: User) => {
  const sql = {
    text: 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, verified',
    values: [username, email, password],
  };

  return connection.query(sql);
};

export default signupQuery;
