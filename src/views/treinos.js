export default class TreinosView {

    constructor(rootElement) {
        this.app = this.getElement(rootElement);
        this.days = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    }

    getElement(el) {
        const element = document.querySelector(el);
        return element;
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
    }

    renderList = (data) => {
        let html = '';

        if (data.length > 0) {
            data.reverse().map(table => html += this.tableHTML(table));
            this.render(html);
        }
    }

    renderCreate = () => {

        let html = `
        <div class="row mt-5"><div class="col-md-12">
            <h4 class="mb-3">Planeje a semana na guitarra</h4>
            <p class="bolder">Digite um nome no campo abaixo antes de salvar a tabela</p>
            <input type="text" class="mb-2 form-control" name="nome-registro" class="form-control" placeholder="!!! Digite um nome aqui para o treino antes de salvar!!!">
            <div class="opcoes-disponiveis"></div>

            <div class="delete-item" >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
            <span>Solte aqui para excluir</span></div>

            <table class="table table-guitar-drops">
            <thead class="thead-dark"><tr>
                <th>Domingo</th>
                <th>Segunda</th>
                <th>Terça</th>
                <th>Quarta</th>
                <th>Quinta</th>
                <th>Sexta</th>
                <th>Sábado</th>
            </tr></thead>  

            <tbody>
                <tr>
                <td><div class="drop-here" id="treino-domingo"></div></td>
                <td><div class="drop-here" id="treino-segunda"></div></td>
                <td><div class="drop-here" id="treino-terca"></div></td>
                <td><div class="drop-here" id="treino-quarta"></div></td>
                <td><div class="drop-here" id="treino-quinta"></div></td>
                <td><div class="drop-here" id="treino-sexta"></div></td>
                <td><div class="drop-here" id="treino-sabado"></div></td>
                </tr>
            </tbody>
            </table>
            
            <button class="btn btn-dark btn-lg btn-block mb-3" type="submit" id="send-form">Salvar tabela</button>
        </div></div></div>`;

        this.render(html);

    }
}