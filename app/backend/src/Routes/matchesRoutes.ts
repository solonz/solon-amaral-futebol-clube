import { Router } from 'express';
import matchesController from '../Controllers/matchesController';

const matchesRoutes = Router();

matchesRoutes.get('/', matchesController.allMatches);
matchesRoutes.post('/', matchesController.createMatch);
matchesRoutes.patch('/:id/finish', matchesController.finishMatch);
matchesRoutes.patch('/:id', matchesController.updateOnGoingMatch);

export default matchesRoutes;
