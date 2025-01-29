import { hash, compare } from "bcrypt";

export const hashPassword = async (password) => {
  return await hash(password, 10);
};

export const comparePassword = async (password, hashedPassword) => {
  return await compare(password, hashedPassword);
};
