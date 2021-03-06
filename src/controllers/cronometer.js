export default class CronometerController {

    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.renderCronometer();
        this.initHandlers();
    }

    initTimer = () => {
        this.model.createTimeWorker();
        this.model.timeWorker.onmessage = (event) => {
            this.view.getElement('#cr-time').value = event.data;
        };
    }

    initHandlers = () => {
        this.view.getElement('#start-cr').addEventListener('click', this.initTimer);
    }

}
