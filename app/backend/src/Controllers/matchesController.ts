import { Request, Response } from 'express';
import httpStatus from '../handlers/httpStatus';
import MatchesService from '../Services/matchesService';
import JWT from '../helpers/jwt';

export default class matchesController {
  static async allMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    const matches = await MatchesService.allMatches(inProgress as string | undefined);

    return res.status(httpStatus.success).json(matches);
  }

  static async createMatch(req: Request, res: Response) {
    const { homeTeam, awayTeam } = req.body;

    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(httpStatus.badRequest).json({ message: 'Missing token' });
    }
    if (homeTeam === awayTeam) {
      return res.status(httpStatus.unprocessableEntity)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const validate = await JWT.validateToken(authorization);
    if (validate === 'Expired or invalid token') {
      return res.status(httpStatus.unauthorized).json({ message: 'Token must be a valid token' });
    }
    const createdMatch = await MatchesService.createMatch(req.body);
    return res.status(createdMatch.status).json(createdMatch.message);
  }

  static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await MatchesService.finishMatch(id);
    return res.status(httpStatus.success).json({ message: 'Finished' });
  }

  static async updateOnGoingMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    const update = await MatchesService.updateOnGoingMatch(id, body);
    return res.status(update.status).json(update.message);
  }
}
