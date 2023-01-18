import { Router } from 'express';
import TeamsController from '../Controllers/teamsController';

const teamsRoutes = Router();

teamsRoutes.get('/:id', TeamsController.getTeam);
teamsRoutes.get('/', TeamsController.getTeams);

export default teamsRoutes;
