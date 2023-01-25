export interface CreateMatch {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface EditGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}
