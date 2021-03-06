export default class CronometerController {

    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.renderCronometer();
        this.initHandlers();
    }

    onShowCronometer = (treino) => {
        this.view.showCronometer(treino);
    }

    onInitTimer = () => {
        this.model.createTimeWorker();
        this.model.timeWorker.onmessage = (event) => {
            this.view.updateTime(event.data);
        };
    }

    onStopTimer = () => {
        this.model.destroyTimeWorker();
        this.view.resetTime();
    }

    onSaveTimer = (e) => {

        const table_id = e.target.dataset.idTable;
        const titulo = this.view.getElement('.cr-title').innerHTML;
        const tempo = this.view.getElement('#cr-time').value;

        let data = {
            titulo: titulo,
            table_id: table_id,
            tempo: tempo
        }

        this.model.saveTempo(data)
            .then(() => {
                this.view.hideCronometer();
                this.onStopTimer();
            })
    }

    initHandlers = () => {
        this.view.getElement('#start-cr').addEventListener('click', this.onInitTimer);
        this.view.getElement('#stop-cr').addEventListener('click', this.onStopTimer);
        this.view.getElement('#btn-salvar').addEventListener('click', this.onSaveTimer);
    }

}
