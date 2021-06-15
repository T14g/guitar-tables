export default class TemposController {
    constructor(model, view, container) {
        this.model = model;
        this.view = view;
        this.container = container;
        this.onShowTotals();
    }

    onGetTempos = (data) => {
        const tempos = this.model.totalTime(data);
        const html = this.view.temposHTML(tempos);
        const title = "Tempos registrados";
        const preContent = 'Tempo total: ' + this.model.sumAllTimers(data);

        return { title: title, pre: preContent, html: html };
    }

    onShowTotals = () => {
        console.log(this.model);
        this.model.getAllTempos()
            .then((response)=>{
                console.log(response);
            })
        // console.log(tempos);
    }

    onGetTemposTotals = () => {
        const tempos = this.model.totalTime(this.model.tempos);
        const html = this.view.temposHTML(tempos);
        const title = "Tempos registrados";
        const preContent = 'Tempo total: ' + this.model.sumAllTimers(this.model.tempos);

        return { title: title, pre: preContent, html: html };
    }

    onGetTemposDetails = () => {
        const html = this.view.temposHTML(this.model.tempos);
        const title = "Tempos registrados";
        const preContent = 'Tempo total: ' + this.model.sumAllTimers(this.model.tempos);

        return { title: title, pre: preContent, html: html };
    }
}