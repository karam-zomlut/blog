import { connection } from '../../config';

type User = {
  email: string;
};

const checkEmailQuery = ({ email }: User) => {
  const sql = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  };

  return connection.query(sql);
};

export default checkEmailQuery;
