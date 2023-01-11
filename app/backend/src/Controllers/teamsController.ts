import { Request, Response } from 'express';
import Team from '../database/models/teamsModel';

export default class TeamsController {
  static async getTeams(req: Request, res: Response) {
    console.log('cheguei aqui');

    const allTeams = await Team.findAll();
    console.log(allTeams);

    return res.status(200).json(allTeams);
  }
}
