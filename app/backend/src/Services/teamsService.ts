import Team from '../database/models/teamsModel';

export default class TeamsService {
  static async team(id: string) {
    const teamByPk = Team.findOne({ where: { id } });
    return teamByPk;
  }
}
