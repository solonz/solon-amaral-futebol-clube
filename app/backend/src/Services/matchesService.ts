import { INewMatch } from '../interfaces';
import Match from '../database/models/matchesModel';
import Team from '../database/models/teamsModel';

export default class MatchesService {
  static async allMatches(inProgress: string | undefined) {
    const teams = [
      { model: Team, attributes: ['teamName'], as: 'teamHome' },
      { model: Team, attributes: ['teamName'], as: 'teamAway' },
    ];
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
    const allMatches = await Match.findAll();
    return allMatches;
  }

  static async insertMatch(body: INewMatch) {
    console.log(body);

    const newMatch = await Match.create({ ...body, inProgress: 'true' });
    console.log(`isso aqui é void? -> ${newMatch.id}`);

    const createdMatch = await this.findMatchByPk(newMatch.id);
    console.log(createdMatch);

    return createdMatch;
  }

  static async findMatchByPk(id: number) {
    const match = await Match.findByPk(id);
    return match;
  }
}
