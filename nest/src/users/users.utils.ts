import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const saltPassword = (password: string) => {
  return bcrypt.hash(password, saltOrRounds);
}
