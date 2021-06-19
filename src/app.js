import TreinosModel from './models/treinos.js';
import TreinosView from './views/treinos.js';
import TreinosController from './controllers/treinos.js';

import CronometerModel from './models/cronometer.js';
import CronometerView from './views/cronometer.js';
import CronometerController from './controllers/cronometer.js';

import ModalModel from './models/modal.js';
import ModalView from './views/modal.js';
import ModalController from './controllers/modal.js';

import TemposModel from './models/tempos.js';
import TemposView from './views/tempos.js';
import TemposController from './controllers/tempos.js';


const APP_CONTAINER = '#appContainer';
const TEMPO_CONTAINER = '#tempoContainer';

const MODAL = new ModalController(new ModalModel(), new ModalView(APP_CONTAINER));
const CRONOMETER = new CronometerController(new CronometerModel(), new CronometerView(APP_CONTAINER));
const TREINOS = new TreinosController(new TreinosModel(), new TreinosView(APP_CONTAINER), MODAL, CRONOMETER);
const TEMPOS = new TemposController(new TemposModel() , new TemposView(), TEMPO_CONTAINER);

document.querySelector('.botao-listar').addEventListener('click', TREINOS.onListTreinos);
document.querySelector('.load-home').addEventListener('click', TREINOS.onShowNewest);
document.querySelector('.botao-nova').addEventListener('click', TREINOS.onCreateTreino);


document.querySelector('.show-menu').addEventListener('click', () => {
    let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : document.body.scrollTop;

    document.querySelector('.sidebar').style.top = scrollTop + 'px';
    document.querySelector('.sidebar').classList.remove('hiden');
    document.querySelector('body').classList.add('blocked');
    document.querySelector('.screen-overlay').style.top = scrollTop + 'px';
    document.querySelector('.screen-overlay').classList.remove('hidden');
})

document.querySelector('.hide-menu').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.add('hiden');
    document.querySelector('body').classList.remove('blocked');
    document.querySelector('.screen-overlay').classList.add('hidden');
})

