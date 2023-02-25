import { Secret } from 'jwt-promisify';

declare namespace NodeJS {
  interface ProcessEnv {
    SECRET_KEY?: Secret;
  }
}
