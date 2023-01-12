import { Router } from 'express';
import matchesController from '../Controllers/matchesController';

const matchesRoutes = Router();

matchesRoutes.get('/', matchesController.allMatches);

export default matchesRoutes;
