export default class TreinosController {

    constructor(model, view, modal, cronometer) {
        this.model = model;
        this.view = view;
        this.modal = modal;
        this.cronometer = cronometer;
        this.onLoadNewest();
    }

    onLoadNewest() {

        this.model.getNewest()
            .then(data => {
                this.view.renderNewest(data);
                this.cronometerEventsHandler();
                this.tempoEventHandler();
            })
    }

    onShowTempo = (e) => {
        const id = e.target.dataset.tableId;

        this.model.tempos.model.getTempos(id)
            .then((data) => {
                const tempos = this.model.tempos.onGetTempos(data);
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

    onShowNewest = (e) => {
        e.preventDefault();

        this.view.renderNewest(this.model.newest);

    }

    onShowTempoTotals = () => {
        const tempos = this.model.tempos.onGetTemposTotals();
        this.modal.onShowModal(tempos);
    }

    onShowTempoDetails = () => {
        const tempos = this.model.tempos.onGetTemposDetails();
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

            }
        })

        this.cronometerStopPropagation();
    }

}