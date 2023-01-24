import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) { }

  static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) return MatchController.getMatchesInProgress(req, res);
    const { message } = await MatchService.getAll();
    return res.status(200).json(message);
  }

  static async getMatchesInProgress(req: Request, res: Response) {
    const { inProgress } = req.query;
    // Convert string to boolean
    const progress = (inProgress === 'true');
    const message = await MatchService.getMatchesInProgress(progress);
    return res.status(200).json(message);
  }
}
