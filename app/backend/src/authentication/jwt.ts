import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import IUserJwt from './IUserJwt';

dotenv.config();

const secret = process.env.JWT_SECRET || 'segredim';

const createToken = (userWithoutPassword: IUserJwt) => {
  const token = jwt.sign({ data: userWithoutPassword }, secret, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });
  return token;
};

// const verifyToken = (authorization: string) => {
//   try {
//     const payload = jwt.verify(authorization, secret);

//     return payload;
//   } catch (error) {
//     return { isError: true, error };
//   }
// };
const verifyToken = (authorization: string) => authorization;

export { createToken, verifyToken };
