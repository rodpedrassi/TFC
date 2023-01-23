import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private userService = new UserService()) { }

  static async login(req: Request, res: Response) {
    const { message, type } = await UserService.login(req.body);
    if (type) return res.status(401).json({ message });
    return res.status(200).json({ token: message });
  }

  static getRole(req: Request, res: Response) {
    const { decoded: { data: { role } } } = req.body;
    return res.status(200).json({ role });
  }
}
