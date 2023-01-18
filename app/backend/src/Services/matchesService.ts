import { IMatchUpdate, INewMatch } from '../interfaces';
import Match from '../database/models/matchesModel';
import Team from '../database/models/teamsModel';

export default class MatchesService {
  static async allMatches(inProgress?: string | undefined) {
    console.log('CHAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

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

  // eslint-disable-next-line max-lines-per-function
  static async updateOnGoingMatch(id: string, body: IMatchUpdate) {
    const matchStatus = await Match.findOne({ where: { id } });
    if (!matchStatus) {
      return {
        status: 400,
        message: 'invalid match id',
      };
    }
    if (!matchStatus.inProgress) {
      return { status: 400, message: 'match already finished' };
    }
    console.log(body);

    await Match.update(
      { homeTeamGoals: Number(body.homeTeamGoals), awayTeamGoals: Number(body.awayTeamGoals) },
      { where: { id } },
    );
    return {
      status: 200,
      message: 'Match up-to-date',
    };
  }
}
