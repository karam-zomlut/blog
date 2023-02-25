import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const SECRET_KEY = `${process.env.SECRET_KEY}`;


const signToken = (payload: object, options: object) => {
  return new Promise((resolve: any, reject: any) => {
    sign(
      payload,
      SECRET_KEY,
      options,
      (err: any, token?: string) => {
        if (err) {
          reject(err);
        }

        resolve(token);
      }
    );
  })
};

export default signToken;