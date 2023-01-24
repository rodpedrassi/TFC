import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) { }

  static async getAll(req: Request, res: Response) {
    const { message } = await MatchService.getAll();
    return res.status(200).json(message);
  }
}
