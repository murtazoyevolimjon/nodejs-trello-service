import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

export const loginPassword = async (plain, hashed) => {
  return await bcrypt.compare(plain, hashed);
};
