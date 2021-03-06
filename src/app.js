import TreinosModel from './models/treinos.js';
import TreinosView from './views/treinos.js';
import TreinosController from './controllers/treinos.js';
import CronometerModel from './models/cronometer.js';
import CronometerView from './views/cronometer.js';
import CronometerController from './controllers/cronometer.js';

const APP_CONTAINER = '#appContainer';
const CRONOMETER = new CronometerController(new CronometerModel(), new CronometerView(APP_CONTAINER));
const TREINOS = new TreinosController(new TreinosModel(), new TreinosView(APP_CONTAINER, CRONOMETER.view));

