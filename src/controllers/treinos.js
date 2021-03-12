import TemposModel from '../models/tempos.js';
import TemposView from '../views/tempos.js';
import TemposController from './tempos.js';
import TiposModel from '../models/tipos.js';
import TiposView from '../views/tipos.js';
import TiposController from './tipos.js';


export default class TreinosController {

    constructor(model, view, modal, cronometer) {
        this.model = model;
        this.view = view;
        this.modal = modal;
        this.cronometer = cronometer;
        this.newest = null;
        this.tipos = null;
        this.onLoadNewest();
    }

    onLoadNewest() {

        this.model.getNewest()
            .then(data => {
                this.view.renderNewest(data);
                this.newest = data;
                this.newest.tempos = new TemposController(new TemposModel(), new TemposView());
                this.cronometerEventsHandler();

                this.tempoEventHandler();
            })
    }

    onShowTempo = (e) => {
        const id = e.target.dataset.tableId;

        this.newest.tempos.model.getTempos(id)
            .then((data) => {
                const tempos = this.newest.tempos.onGetTempos(data);
                this.modal.onShowModal(tempos);
            })
    }

    onListTreinos = (e) => {
        e.preventDefault();

        this.model.getTreinos()
            .then((treinos) => {
                this.view.renderList(treinos);
                this.cronometerEventsHandler();
                this.tempoEventHandler();
            })
    }

    onCreateTreino = (e) => {
        e.preventDefault();
        this.view.renderCreate();
        this.tipos = new TiposController(new TiposModel(), new TiposView('.opcoes-disponiveis'));
        this.tipos.onDisplayTipos();

        document.querySelector('#send-form').addEventListener('click', this.onSaveTreino);
    }

    onShowNewest = (e) => {
        e.preventDefault();
        this.view.renderNewest(this.model.newest);
    }

    onGetSaveData = () => {

        const title = document.querySelector('[name="nome-registro"]');
        const dias = [
            { 'domingo': document.querySelector('#treino-domingo') },
            { 'segunda': document.querySelector('#treino-segunda') },
            { 'terca': document.querySelector('#treino-terca') },
            { 'quarta': document.querySelector('#treino-quarta') },
            { 'quinta': document.querySelector('#treino-quinta') },
            { 'sexta': document.querySelector('#treino-sexta') },
            { 'sabado': document.querySelector('#treino-sabado') }];

        const treinos = {};

        dias.forEach((dia) => {
            let name = Object.keys(dia)[0];
            let data = Object.values(dia)[0];

            if (data.children.length > 0) {
                let elements = [...data.children];
                let arr = [];

                elements.map(el => {
                    arr.push(el.innerHTML);
                })

                treinos[name] = arr;
            }
        })

        let objeto = {
            'name': title.value,
            'json': JSON.stringify(treinos)
        };

        return objeto;

    }

    onSaveTreino = () => {
        const data = this.onGetSaveData();
        this.model.saveTreino(data)
            .then(() => {
                this.model.getNewest().then(() => {
                    this.view.renderNewest(this.model.newest)
                })
            })
    }

    onShowTempoTotals = () => {
        const tempos = this.newest.tempos.onGetTemposTotals();
        this.modal.onShowModal(tempos);
    }

    onShowTempoDetails = () => {
        const tempos = this.newest.tempos.onGetTemposDetails();
        this.modal.onShowModal(tempos);
    }

    tempoEventHandler = () => {

        const elements = document.querySelectorAll('.tempos-tabela');

        [...elements].map(el => {
            el.onclick = (e) => {
                this.onShowTempo(e);
            }
        })

        document.querySelector('.custom-btn-detalhes').addEventListener('click', this.onShowTempoDetails);
        document.querySelector('.custom-btn-totals').addEventListener('click', this.onShowTempoTotals);
    }

    cronometerStopPropagation = () => {

        const innerEls = document.querySelectorAll('.stop-watch-el');

        [...innerEls].map(el => {
            el.onclick = (e) => {
                e.stopPropagation();
                e.target.parentElement.click();
            }
        })
    }

    cronometerEventsHandler = () => {
        const elements = document.querySelectorAll('.watch-container');

        [...elements].map(el => {
            el.onclick = (e) => {

                let _name = e.target.dataset.nomeItem;
                let _id = e.target.dataset.tableId;
                let treino = { name: _name, id: _id };
                this.cronometer.view.showCronometer(treino);
                this.cronometer.view.setTableID(_id);

            }
        })

        this.cronometerStopPropagation();
    }
}