import { Request, Response } from 'express';
import httpStatus from '../handlers/httpStatus';
import TeamsService from '../Services/teamsService';
import Team from '../database/models/teamsModel';

export default class TeamsController {
  static async getTeams(req: Request, res: Response) {
    const allTeams = await Team.findAll();

    return res.status(httpStatus.success).json(allTeams);
  }

  static async getTeam(req: Request, res: Response) {
    const { id } = req.params;
    const teamByPk = await TeamsService.team(id);
    return res.status(httpStatus.success).json(teamByPk);
  }
}
