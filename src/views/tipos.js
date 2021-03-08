export default class TiposView {

    constructor(containerElement) {
        this.containerElement = document.querySelector(containerElement);
    }

    tiposHTML = (data) => {
        let count = 1;
        let html = '';

        if (data.length > 0) {
            data.map(option => {
                html += '<span id="elemento-' + count + '" draggable="true" class="train-option">' + option.name + '</span>';
                count++;
            })
        }

        html += '<button class="btn btn-success add-new-tipo">Adicionar</button>';

        return html;

    }

    renderTipos = (data) => {
        let html = this.tiposHTML(data);
        this.containerElement.innerHTML = html;
    }
}