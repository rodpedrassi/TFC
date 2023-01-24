import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  static async getAll() {
    const allTeams = await TeamModel.findAll();

    return { type: null, message: allTeams };
  }
}
