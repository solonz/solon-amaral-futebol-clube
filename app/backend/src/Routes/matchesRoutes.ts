import { Router } from 'express';
import matchesController from '../Controllers/matchesController';

const matchesRoutes = Router();

matchesRoutes.get('/', matchesController.allMatches);
matchesRoutes.post('/', matchesController.createMatch);
matchesRoutes.patch('/:id', matchesController.updateOnGoingMatch);
matchesRoutes.patch('/:id/finish', matchesController.finishMatch);

export default matchesRoutes;
