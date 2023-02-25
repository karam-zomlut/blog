import { connection } from '../../config';

type args = {
  username: string;
};

const checkUsernameQuery = async ({ username }: args) => {
  const sql = {
    text: 'SELECT * FROM users WHERE username = $1',
    values: [username],
  };

  return await connection.query(sql);
};

export default checkUsernameQuery;
