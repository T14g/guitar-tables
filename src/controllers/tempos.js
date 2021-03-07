export default class TemposController{
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    onGetTempos = (data) => {
        const tempos = this.view.totalTime(data);
        const html = this.view.temposHTML(tempos);
        const title = "Tempos registrados";
        const preContent = 'Tempo total: ' + this.view.sumAllTimers(data);

        return { title: title, pre: preContent, html: html };
    }

    onGetTemposTotals = () => {
        const tempos = this.view.totalTime(this.model.tempos);
        const html = this.view.temposHTML(tempos);
        const title = "Tempos registrados";
        const preContent = 'Tempo total: ' + this.view.sumAllTimers(this.model.tempos);

        return { title: title, pre: preContent, html: html };
    }

    onGetTemposDetails = () => {
        const html = this.view.temposHTML(this.model.tempos);
        const title = "Tempos registrados";
        const preContent = 'Tempo total: ' + this.view.sumAllTimers(this.model.tempos);

        return { title: title, pre: preContent, html: html };
    }
}