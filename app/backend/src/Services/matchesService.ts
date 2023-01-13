import { INewMatch } from '../interfaces';
import Match from '../database/models/matchesModel';
import Team from '../database/models/teamsModel';

export default class MatchesService {
  static async allMatches(inProgress: string | undefined) {
    const teams = [
      { model: Team, attributes: ['teamName'], as: 'teamHome' },
      { model: Team, attributes: ['teamName'], as: 'teamAway' },
    ];
    if (!inProgress) {
      const allMatches = await Match.findAll({ include: teams });
      return allMatches;
    }
    if (inProgress === 'true') {
      const inProgressMatches = await Match
        .findAll({ include: teams, where: { inProgress: inProgress === 'true' } });

      return inProgressMatches;
    }
    if (inProgress === 'false') {
      const notInProgressMatches = await Match
        .findAll({ include: teams, where: { inProgress: 0 } });

      return notInProgressMatches;
    }
  }

  static async insertMatch(body: INewMatch) {
    const newMatch = await Match.create({ ...body, inProgress: 'true' });

    const createdMatch = await this.findMatchByPk(newMatch.id);

    return createdMatch;
  }

  static async findMatchByPk(id: number) {
    const match = await Match.findByPk(id);
    return match;
  }

  static async finishMatch(id: string) {
    const finishedMatch = await Match.update({ inProgress: 0 }, { where: { id } });
    return finishedMatch;
  }
}
