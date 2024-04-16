const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, salt);
};

const verifyPassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

export { hashPassword, verifyPassword };
