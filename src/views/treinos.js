export default class TreinosView{

    constructor (rootElement) {
        this.app  = this.getElement(rootElement);
        this.days = ['domingo','segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    }

    getElement(el) {
        const element = document.querySelector(el);
        return element;
    }

    tableHTML(table) {
        
        const treinos = JSON.parse(table.json);
        console.log(treinos);

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
            if(treinos[dia] && treinos[dia].length > 0) {
    
                html += `<td><div class="list-${dia} list-week">`;

                treinos[dia].map(item => {
                    html += ` <span class="train-option">${item}<span class="watch-container" data-table-id=${table._id} data-nome-item='${item}'><span class="stop-watch-el"></span></span></span>`;
                })
    
            }else{
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
}