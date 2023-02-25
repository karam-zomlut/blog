import { verify } from "jsonwebtoken";
import { config } from "dotenv";

config();

const SECRET_KEY = `${process.env.SECRET_KEY}`;

const verifyToken = (token: string) => {
  return new Promise((resolve: any, reject: any) => {
    verify(token, SECRET_KEY, (err: any, decoded?: any) => {
      if (err) {
        reject(err);
      }

      resolve(decoded);
    })
  })
};

export default verifyToken;