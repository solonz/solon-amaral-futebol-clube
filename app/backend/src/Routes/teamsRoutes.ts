import { Router } from 'express';
import TeamsController from '../Controllers/teamsController';

const teamsRoutes = Router();

teamsRoutes.get('/', TeamsController.getTeams);
teamsRoutes.get('/:id', TeamsController.getTeam);

export default teamsRoutes;
