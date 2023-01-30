import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
// import LeaderboardHelper from './helpers/LeaderboardHelper';

export default class LeaderboardService {
  static async getAllTeamsAndMatches() {
    const teams = await TeamModel.findAll({ attributes: ['team_name'] });
    const matches = await MatchModel.findAll({ where: { inProgress: false } });
    return { teams, matches };
  }

  // static async getLeaderboard() {
  //   const { teams, matches } = this.getAllTeamsAndMatches();
  //   const board = matches.map((team: MatchModel[], index: number) =>{
  //       name: teams[index],
  //       totalPoints: LeaderboardHelper.totalPoints(team),
  //   })
  // }
}
