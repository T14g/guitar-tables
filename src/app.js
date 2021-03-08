import TreinosModel from './models/treinos.js';
import TreinosView from './views/treinos.js';
import TreinosController from './controllers/treinos.js';

import CronometerModel from './models/cronometer.js';
import CronometerView from './views/cronometer.js';
import CronometerController from './controllers/cronometer.js';

import ModalModel from './models/modal.js';
import ModalView from './views/modal.js';
import ModalController from './controllers/modal.js';


const APP_CONTAINER = '#appContainer';
const MODAL = new ModalController(new ModalModel(), new ModalView(APP_CONTAINER));
const CRONOMETER = new CronometerController(new CronometerModel(), new CronometerView(APP_CONTAINER));
const TREINOS = new TreinosController(new TreinosModel(), new TreinosView(APP_CONTAINER), MODAL, CRONOMETER);

document.querySelector('.botao-listar').addEventListener('click', TREINOS.onListTreinos);
document.querySelector('.load-home').addEventListener('click', TREINOS.onShowNewest);
document.querySelector('.botao-nova').addEventListener('click', TREINOS.onCreateTreino);