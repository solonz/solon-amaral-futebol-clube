import { Request, Response } from 'express';
import httpStatus from '../handlers/httpStatus';
import Match from '../database/models/matchesModel';

export default class matchesController {
  static async allMatches(req: Request, res: Response) {
    const matches = await Match.findAll();
    return res.status(httpStatus.success).json(matches);
  }
}
