import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const saltPassword = async (password: string) => {
  return bcrypt.hash(password, saltOrRounds);
}

export const checkIsPasswordCorrect = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword)
}
