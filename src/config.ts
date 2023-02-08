import dotenv from 'dotenv';
dotenv.config({path: ".env"});
export const USER_KEY_VALID = process.env.USER_KEY_VALID;
export const USER_KEY_INVALID = process.env.USER_KEY_INVALID;
