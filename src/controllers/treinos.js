export default class TreinosController {

    constructor(model, view, cronometer) {
        this.model = model;
        this.view = view;
        this.cronometer = cronometer;
        this.onLoadNewest();
    }

    onLoadNewest() {

        this.model.getNewest()
            .then(data => {
                this.view.renderNewest(data);
                this.cronometerEventsHandler();
            })
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