import { Request, Response } from 'express';
import httpStatus from '../handlers/httpStatus';
import TeamsService from '../Services/teamsService';
import Team from '../database/models/matchesModel';

export default class TeamsController {
  static async getTeams(req: Request, res: Response) {
    console.log('cheguei aqui');

    const allTeams = await Team.findAll();
    console.log(allTeams);

    return res.status(httpStatus.success).json(allTeams);
  }

  static async getTeam(req: Request, res: Response) {
    const { id } = req.params;
    const teamByPk = await TeamsService.team(id);
    res.status(httpStatus.success).json(teamByPk);
  }
}
