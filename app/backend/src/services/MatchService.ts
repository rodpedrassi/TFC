// import sequelize = require('sequelize');
import Team from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import { CreateMatch } from './interfaces/IMatch';

// const { Op } = sequelize;

export default class MatchService {
  static async getAll() {
    const allMatches = await MatchModel.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return { type: null, message: allMatches };
  }

  static async getMatchesInProgress(progress: boolean) {
    const allMatchesInProgress = await MatchModel.findAll({ where: { inProgress: progress },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ] });
    return allMatchesInProgress;
  }

  static async create(match: CreateMatch) {
    const newMatch = await MatchModel.create({ ...match, inProgress: true });
    return newMatch;
  }

  static async updateProgress(matchId: number) {
    const [affectedRows] = await MatchModel.update({ inProgress: false }, {
      where: {
        id: matchId,
      },
    });
    if (affectedRows > 0) return { message: 'Finished' };
    return { type: 'Not Found', message: 'Match not Found' };
  }
}
