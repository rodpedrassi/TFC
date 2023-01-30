import { Request, Response } from 'express';
import result from '../tests/mocks/LeaderBoardMock';

let aux = 0;
export default class Test {
  static async testzim(req: Request, res: Response) {
    if (aux >= 1) {
      return res.status(200).json(result.homeResult2);
    }
    aux += 1;
    return res.status(200).json(result.homeResult1);
  }
}

// name: 'Corinthians',
// totalPoints: 6,
// totalGames: 2,
// totalVictories: 2,
// totalDraws: 0,
// totalLosses: 0,
// goalsFavor: 6,
// goalsOwn: 1,
// goalsBalance: 5,
// efficiency: '100.00',
// },
