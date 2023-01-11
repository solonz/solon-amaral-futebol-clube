import { Router } from 'express';
import TeamsController from '../Controllers/teamsController';

const teamsRoutes = Router();

teamsRoutes.get('/', TeamsController.getTeams);

export default teamsRoutes;
