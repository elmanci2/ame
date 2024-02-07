import bcrypt from "bcrypt";

// later
export const BcryptEncrypt = async (password: string, Salt?: number) => {
  const saltRounds = Salt ?? 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const passwordCrypt = bcrypt.hashSync(password, salt);
  return passwordCrypt;
};

export const BcryptDecrypt = async (hash: string, password: string) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};
