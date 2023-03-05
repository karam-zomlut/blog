import { Request } from 'express';

declare global {
  namespace Express {
    export interface Request {
      resetPasswordAccsess?: boolean;
      user?: {
        id: number;
        username: string;
        email: string;
        verified: boolean;
      }
    }
  }
}
