import { IMatchUpdate, INewMatch } from '../interfaces';
import Match from '../database/models/matchesModel';
import Team from '../database/models/teamsModel';

export default class MatchesService {
  static async allMatches(inProgress?: string | undefined) {
    const teams = [
      { model: Team, attributes: ['teamName'], as: 'teamHome' },
      { model: Team, attributes: ['teamName'], as: 'teamAway' },
    ];
    if (inProgress === 'true') {
      return Match.findAll({ include: teams, where: { inProgress: inProgress === 'true' } });
    }
    if (inProgress === 'false') {
      return Match.findAll({ include: teams, where: { inProgress: 0 } });
    }
    return Match.findAll({ include: teams });
  }

  static async createMatch(body: INewMatch) {
    const { homeTeam, awayTeam } = body;

    const findHomeTeam = await Team.findOne({ where: { id: homeTeam } });
    const findAwayTeam = await Team.findOne({ where: { id: awayTeam } });

    if (!findHomeTeam || !findAwayTeam) {
      return {
        status: 404,
        message: { message: 'There is no team with such id!' },
      };
    }
    const newMatch = await Match.create({ ...body, inProgress: 'true' });

    const createdMatch = await this.findMatchByPk(newMatch.id);

    return {
      status: 201,
      message: createdMatch,
    };
  }

  static async findMatchByPk(id: number) {
    const match = await Match.findByPk(id);
    return match;
  }

  static async finishMatch(id: string) {
    const finishedMatch = await Match.update({ inProgress: 0 }, { where: { id } });
    return finishedMatch;
  }

  static async finishedMatches() {
    const finished = Match.findAll({ where: { inProgress: 'false' } });
    return finished;
  }

  static async updateOnGoingMatch(id: string, body: IMatchUpdate) {
    const matchStatus = await Match.findOne({ where: { id } });
    if (!matchStatus) {
      return {
        status: 400,
        message: 'invalid match id',
      };
    }
    Match
      .update(
        { homeTeamGoals: body.homeTeamGoals, awayTeamGoals: body.awayTeamGoals },
        { where: { id } },
      );
    return {
      status: 200,
      message: 'Match up-to-date',
    };
  }
}
