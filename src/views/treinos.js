export default class TreinosView {

    constructor(rootElement, cronometerView) {
        this.app = this.getElement(rootElement);
        this.days = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
        this.cronometerView = cronometerView;
    }

    getElement(el) {
        const element = document.querySelector(el);
        return element;
    }

    cronometerEventsHandler() {
        const elements = document.querySelectorAll('.watch-container');

        [...elements].map(el => {
            el.onclick = (e) => {

                let _name = e.target.dataset.nomeItem;
                let _id = e.target.dataset.tableId;
                let treino = { name: _name, id: _id };
                this.cronometerView.showCronometer(treino);

            }
        })

        this.cronometerStopPropagation();
    }

    cronometerStopPropagation() {

        const innerEls = document.querySelectorAll('.stop-watch-el');

        [...innerEls].map(el => {
            el.onclick = (e) => {
                e.stopPropagation();
                e.target.parentElement.click();
            }
        })
    }

    tableHTML(table) {

        const treinos = JSON.parse(table.json);

        let html = ``;
        html += `<div class="guitar-table-info">Nome da tabela: <span>${table.name}</span>
            <div class="btn-group options-group">
                    <button class="btn btn-secondary btn-sm dropdown-toggle btn-options" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Opções
                    </button>
                    <div class="dropdown-menu">
                        <button class="dropdown-item editar-tabela" data-table-id="${table._id}" >Editar</button>
                        <button class="dropdown-item excluir-tabela" data-table-id="${table._id}" >Excluir</button>
                        <button class="dropdown-item tempos-tabela" data-table-id="${table._id}" >Ver tempo</button>
                    </div>
                </div>
            </div>`;

        html += `<table class="table table-listagem">`;
        html += `<thead class="thead-dark"><tr>`;

        this.days.map(dia => {
            html += `<th>${dia}</th>`;
        })

        html += `</tr>`;
        html += `</thead><tbody><tr>`;

        this.days.map(dia => {
            if (treinos[dia] && treinos[dia].length > 0) {

                html += `<td><div class="list-${dia} list-week">`;

                treinos[dia].map(item => {
                    html += ` <span class="train-option">${item}<span class="watch-container" data-table-id=${table._id} data-nome-item='${item}'><span class="stop-watch-el"></span></span></span>`;
                })

            } else {
                html += `<td><div class="list-${dia}"></div></td>`;
            }
        })

        html += `</tr>`;
        html += `</tbody>`;
        html += `</table>`;

        return html;
    }

    render(html) {
        this.app.innerHTML = html;
    }

    renderNewest(data) {
        this.render(this.tableHTML(data));
        this.cronometerEventsHandler();
    }
}