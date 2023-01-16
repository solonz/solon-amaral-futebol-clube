import Team from '../database/models/teamsModel';

export default class TeamsService {
  static async team(id: string | number) {
    const teamByPk = Team.findOne({ where: { id } });
    return teamByPk;
  }
}
