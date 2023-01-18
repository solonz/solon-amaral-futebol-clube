import * as express from 'express';
import router from './Routes';
// import leaderboardRoutes from './Routes/leaderboardRoutes';
// import loginRoutes from './Routes/loginRoutes';
// import matchesRoutes from './Routes/matchesRoutes';
// import teamsRoutes from './Routes/teamsRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use(router);
    // this.app.use('/login', loginRoutes);
    // this.app.use('/teams', teamsRoutes);
    // this.app.use('/matches', matchesRoutes);
    // this.app.use('/leaderboard', leaderboardRoutes);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
