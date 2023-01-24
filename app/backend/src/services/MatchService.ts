import MatchModel from '../database/models/MatchModel';

export default class MatchService {
  static async getAll() {
    const allMatches = await MatchModel.findAll();

    return { type: null, message: allMatches };
  }
}
