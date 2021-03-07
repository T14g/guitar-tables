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

    onShowTempoTotals = () => {
        const tempos = this.model.tempos.onGetTemposTotals();
        this.modal.onShowModal(tempos);
    }

    onShowTempoDetails = () => {
        const tempos = this.model.tempos.onGetTemposDetails();
        this.modal.onShowModal(tempos);
    }

    tempoEventHandler = () => {
        document.querySelector('.tempos-tabela').addEventListener('click', this.onShowTempo);
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