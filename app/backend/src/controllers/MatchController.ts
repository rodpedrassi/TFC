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

  static async create(req: Request, res: Response) {
    const { type, message } = await MatchService.create(req.body);
    if (type === 'Not Found') return res.status(404).json({ message });
    if (type === 'Equal Teams') return res.status(422).json({ message });
    return res.status(201).json(message);
  }

  static async updateProgress(req: Request, res: Response) {
    const { id } = req.params;
    const { message } = await MatchService.updateProgress(Number(id));
    return res.status(200).json({ message });
  }
}
