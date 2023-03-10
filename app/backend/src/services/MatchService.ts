// import sequelize = require('sequelize');
import Team from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import { CreateMatch, EditGoals } from './interfaces/IMatch';
import TeamService from './TeamService';

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
    const { awayTeamId, homeTeamId } = match;

    const team1 = await TeamService.getById(homeTeamId);
    const team2 = await TeamService.getById(awayTeamId);
    if (!team1.message || !team2.message) {
      return { type: 'Not Found', message: 'There is no team with such id!' };
    }

    if (awayTeamId === homeTeamId) {
      return {
        type: 'Equal Teams',
        message: 'It is not possible to create a match with two equal teams',
      };
    }

    const newMatch = await MatchModel.create({ ...match, inProgress: true });
    return { message: newMatch };
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

  static async updateGoals(matchId: number, HomeAwayGoals: EditGoals) {
    const [affectedRows] = await MatchModel.update({ ...HomeAwayGoals }, {
      where: {
        id: matchId,
      },
    });
    if (affectedRows > 0) return { type: null, message: 'Score updated successfully' };
    return { type: 'Not Found', message: 'Match not Found' };
  }
}
