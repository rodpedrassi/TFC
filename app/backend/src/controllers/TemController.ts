import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) { }

  static async getAll(req: Request, res: Response) {
    const { message } = await TeamService.getAll();
    return res.status(200).json(message);
  }
}
