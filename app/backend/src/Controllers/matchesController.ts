import { Request, Response } from 'express';
import httpStatus from '../handlers/httpStatus';
import MatchesService from '../Services/matchesService';

export default class matchesController {
  static async allMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    const matches = await MatchesService.allMatches(inProgress as string | undefined);

    return res.status(httpStatus.success).json(matches);
  }

  static async createMatch(req: Request, res: Response) {
    const matchData = req.body;
    const createdMatch = await MatchesService.insertMatch(matchData);
    return res.status(httpStatus.created).json(createdMatch);
  }

  static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await MatchesService.finishMatch(id);
    return res.status(httpStatus.success).json('Finished');
  }
}
