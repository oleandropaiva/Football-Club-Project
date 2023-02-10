import * as JWT from 'jsonwebtoken';

const genToken = (email: string): string => {
  const token = JWT.sign({ email }, process.env.JWT_SECRET as string);
  return token;
};

export default genToken;
