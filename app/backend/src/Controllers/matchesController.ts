import { Request, Response } from 'express';
import httpStatus from '../handlers/httpStatus';
import MatchesService from '../Services/matchesService';

export default class matchesController {
  static async allMatches(req: Request, res: Response) {
    console.log(req.query);
    const { inProgress } = req.query;

    const matches = await MatchesService.allMatches(inProgress as string | undefined);
    console.log(matches);

    return res.status(httpStatus.success).json(matches);
  }

  static async createMatch(req: Request, res: Response) {
    const matchData = req.body;
    const createdMatch = await MatchesService.insertMatch(matchData);
    return res.status(httpStatus.created).json(createdMatch);
  }
}
