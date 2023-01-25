// export default (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) {
//     return res.status(401).json({ message: 'Token not found' });
//   }
//   try {
//     const decoded = verify(token, secret);
//     req.decoded = decoded;
//     next();
//   } catch (e) {
//     return res.status(401).json({ message: 'Expired or invalid token' });
//   }
// };

import { verify } from 'jsonwebtoken';
import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';

const secret = process.env.JWT_SECRET || 'segredim';

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = verify(token, secret);
    req.body.decoded = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};
