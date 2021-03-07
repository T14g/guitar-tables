export default class TemposController{
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    onGetTempos = (data) => {
        const tempos = this.model.totalTime(data);
        const html = this.view.temposHTML(tempos);
        const title = "Tempos registrados";
        const preContent = 'Tempo total: ' + this.model.sumAllTimers(data);

        return { title: title, pre: preContent, html: html };
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